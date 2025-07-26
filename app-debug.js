// Firebase configuration that works on Vercel
// Note: For static sites on Vercel, environment variables aren't directly accessible
// We'll use the hardcoded values but you can create a build process later if needed

const firebaseConfig = {
    apiKey: "AIzaSyB0AMwOt8UliUGoLmiZkDFl1DtawEGGI24",
    authDomain: "collaborative-to-do-list-3d3a9.firebaseapp.com",
    projectId: "collaborative-to-do-list-3d3a9",
    storageBucket: "collaborative-to-do-list-3d3a9.firebasestorage.app",
    messagingSenderId: "860469504164",
    appId: "1:860469504164:web:08878bb1a9952576861e31",
    measurementId: "G-D3ND1EF37N"
};

// Initialize Firebase
console.log('Initializing Firebase...');
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const todosCollection = db.collection('todos');

// Configure Google Auth Provider with additional settings
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile');

// Force account selection to avoid cached login issues
provider.setCustomParameters({
    prompt: 'select_account'
});

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userPic = document.getElementById('user-pic');
const userInfo = document.getElementById('user-info');
const addTodoForm = document.getElementById('add-todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const loginPrompt = document.getElementById('login-prompt');

// --- Authentication ---

// Login with better error handling and debugging
loginBtn.onclick = () => {
    console.log('Login button clicked - attempting Firebase auth...');
    console.log('Current domain:', window.location.hostname);
    
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('✅ Login successful:', result.user);
            console.log('User email:', result.user.email);
            console.log('User name:', result.user.displayName);
        })
        .catch((error) => {
            console.error('❌ Login error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            
            // Show user-friendly error messages
            let errorMessage = 'Login failed. ';
            switch(error.code) {
                case 'auth/unauthorized-domain':
                    errorMessage += 'This domain is not authorized. Please contact the administrator.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage += 'Popup was blocked by your browser. Please allow popups and try again.';
                    break;
                case 'auth/popup-closed-by-user':
                    errorMessage += 'Login was cancelled.';
                    break;
                default:
                    errorMessage += error.message;
            }
            alert(errorMessage);
        });
};

// Logout
logoutBtn.onclick = () => {
    auth.signOut()
        .then(() => {
            console.log('✅ Logout successful');
        })
        .catch((error) => {
            console.error('❌ Logout error:', error);
        });
};

// Auth state listener with detailed logging
auth.onAuthStateChanged(user => {
    console.log('🔄 Auth state changed:', user ? 'User logged in' : 'User logged out');
    if (user) {
        // User is signed in
        console.log('✅ User details:', {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
        });
        
        loginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        userInfo.classList.add('flex');
        addTodoForm.classList.remove('hidden');
        loginPrompt.classList.add('hidden');
        userPic.src = user.photoURL || 'https://via.placeholder.com/40';
        
        // Listen for real-time to-do updates
        listenForTodos();
    } else {
        // User is signed out
        console.log('👤 User signed out');
        if (unsubscribe) {
            unsubscribe();
        }
        loginBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
        addTodoForm.classList.add('hidden');
        loginPrompt.classList.remove('hidden');
        todoList.innerHTML = ''; // Clear the list on logout
    }
});

// --- Firestore Operations ---

// Listen for real-time changes to the 'todos' collection
let unsubscribe; // To stop listening when user logs out
function listenForTodos() {
    console.log('👂 Starting to listen for todos...');
    // Order tasks by creation time, newest first
    unsubscribe = todosCollection.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        console.log('📄 Received todos update:', snapshot.docs.length, 'items');
        const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTodos(todos);
    }, error => {
        console.error("❌ Error fetching todos: ", error);
    });
}

// Render todos to the DOM
function renderTodos(todos) {
    todoList.innerHTML = ''; // Clear current list
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.setAttribute('data-id', todo.id);
        li.className = `flex items-center justify-between p-3 border-b border-slate-200 ${todo.completed ? 'bg-green-50 text-slate-500' : ''}`;
        
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" class="toggle-complete h-5 w-5 rounded text-blue-500 focus:ring-0" ${todo.completed ? 'checked' : ''}>
                <span class="task-text ${todo.completed ? 'line-through' : ''}">${todo.text}</span>
                <small class="text-gray-400">${todo.author || 'Anonymous'}</small>
            </div>
            <button class="delete-todo text-red-400 hover:text-red-600 font-bold">✕</button>
        `;
        todoList.appendChild(li);
    });
}

// Add a new to-do item
addTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const user = auth.currentUser;

    if (text && user) {
        console.log('➕ Adding new todo:', text);
        todosCollection.add({
            text: text,
            completed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid,
            author: user.displayName || 'Anonymous'
        }).then(() => {
            console.log('✅ Todo added successfully');
            todoInput.value = ''; // Clear input field
        }).catch(error => {
            console.error("❌ Error adding document: ", error);
        });
    }
});

// Handle clicks on the list for toggling or deleting
todoList.addEventListener('click', e => {
    const target = e.target;
    const parentLi = target.closest('li');
    if (!parentLi) return;

    const todoId = parentLi.getAttribute('data-id');

    // Toggle complete status
    if (target.matches('.toggle-complete')) {
        const currentStatus = target.checked;
        console.log('🔄 Toggling todo completion:', todoId, currentStatus);
        todosCollection.doc(todoId).update({ completed: currentStatus });
    }

    // Delete to-do
    if (target.matches('.delete-todo')) {
        if(confirm("Are you sure you want to delete this task?")) {
            console.log('🗑️ Deleting todo:', todoId);
            todosCollection.doc(todoId).delete();
        }
    }
});

// Debug info
console.log('🔧 App initialized. Current URL:', window.location.href);
console.log('🔧 Firebase config loaded for project:', firebaseConfig.projectId);
