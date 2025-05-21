import { createContext, useContext, useState, useEffect } from 'react'
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth'
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    serverTimestamp,
} from 'firebase/firestore'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth();
    const db = getFirestore();

    // *********************************** //
    // Create a User Document in FireStore //
    // *********************************** //
    const createUserDocument = async (user, additionalData = {}) => {
        if (!user) {
            console.error("No user provided to createUserDocument");
            return;
        };
        
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        
        if (!userSnap.exists()) {
            const { email } = user;
            const createdAt = serverTimestamp();
            
            try {
                await setDoc(userRef, {
                    email, 
                    createdAt, 
                    ...additionalData,
                })
                console.log("User document created successfully");
            } catch (error) {
                console.error("Error creating user document:", error.message)
            }
        }
    };
    
    // ************************************ //
    // Register with an email and password! //
    // ************************************ //
    const register = async(email, password, username) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            console.log("User created email with:", user.email);

            await updateProfile(user, {
                displayName: username
            });
            
            await createUserDocument(user, { username })
            return user;
        } catch (error) {
            console.error("Registeration error:", error.message);
            throw error;
        }
    }
    
    // ********************************* //
    // Login with an email and password! //
    // ********************************* //
    const login = async(email, password) => {
        try {
            // Signs in with email and password if user exists //
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            return user
        } catch (error) {
            console.error("Login error:", error.message);
            throw error
        }
    }
    
    // ******************** //
    // Sign in with Google! //
    // ******************** //
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            await createUserDocument(user, {
                username: user.displayName || user.email.split("@")[0],
                authProvider: 'google'
            })
            return user;

        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed. Current user:", user);
            try {
                if (!user) {
                    console.log("No user signed in");
                    setUser(null);
                    setLoading(false);
                    return;
                };
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (!userDoc.exists()) {
                    await createUserDocument(user, {
                        username: user.displayName || user.email.split("@")[0],
                        authProvider: user.providerData[0]?.providerId || 'email'
                    });
                    // Fetch the updated document
                    const updatedDoc = await getDoc(doc(db, 'users', user.uid));
                    setUser({
                        ...user,
                        userData: updatedDoc.data()
                    });
                } else {
                    setUser({
                        ...user,
                        userData: userDoc.data()
                    });
                }

            } catch (error) {
                console.log("Error handling auth state change or redirect result", error.message);
                setUser(user)
            }
                
            setLoading(false)
        });
        return () => unsubscribe();
    }, [auth, db])

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => console.log("Auth persistence set to local"))
            .catch((error) => console.error("Error setting persistence", error));
    }, [auth]);
    
    const value = {user, loading, register, login, signInWithGoogle}
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider!')
    }
    return context
};