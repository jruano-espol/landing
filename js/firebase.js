import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeGhkd_2tkTEnzfnlMauo-8WvTkq0dMp0",
    authDomain: "landing-7e76b.firebaseapp.com",
    projectId: "landing-7e76b",
    storageBucket: "landing-7e76b.firebasestorage.app",
    messagingSenderId: "231229766543",
    appId: "1:231229766543:web:582e1d536d25c1c7d1e9fa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function saveVote(productID) {
    const votesRef = ref(database, 'votes');
    const newVoteRef = push(votesRef);
    const voteData = {
        productID: productID,
        date: new Date().toISOString()
    };
    return set(newVoteRef, voteData)
        .then(() => ({ success: true, message: 'Voto guardado correctamente.' }))
        .catch((error) => ({ success: false, message: 'Error al guardar el voto.', error }));
}

function getVotes() {
    return get(ref(database, 'votes'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return {};
            }
        })
        .catch((error) => {
            throw error;
        });
}

export { saveVote, getVotes };
