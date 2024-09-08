import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from '../services/firebaseService';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logout() {
    navigate('/')
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 사용자가 로그인한 경우, Firestore에서 추가 정보를 가져오거나 새 사용자를 생성합니다.
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            ...user,
            isAdmin: userData.isAdmin || false,
          });
        } else {
          // 새 사용자인 경우 Firestore에 문서 생성
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            isAdmin: false, // 기본적으로 관리자 권한은 없음
          });
          setCurrentUser({
            ...user,
            isAdmin: false,
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}