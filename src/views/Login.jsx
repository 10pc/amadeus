import React, { useState } from "react";
import styles from "../style/LoginRegister.module.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import firebaseConfig from "../firebase-config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page or desired internal route upon successful login
    } catch (error) {
      console.error("Error signing in: ", error);
      setErrorMessage("Invalid email or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to home page or desired internal route upon successful registration
    } catch (error) {
      console.error("Error registering: ", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  return (
    <div className="amadeusbg2">
          <div className={styles.container}>
      <div className={styles.formContainer}>
        <button onClick={toggleForm} className={styles.toggleBtn}>
          {isLogin ? "Go to Register" : "Go to Login"}
        </button>
        {errorMessage && (
          <div className={styles.errorText}>{errorMessage}</div>
        )}
        {isLogin ? (
          <div>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleLogin}>
              <label className={styles.label}>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </label>
              <br />
              <label className={styles.label}>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </label>
              <br />
              <button type="submit" className={styles.submitBtn}>
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className={styles.heading}>Register</h2>
            <form onSubmit={handleRegister}>
              <label className={styles.label}>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </label>
              <br />
              <label className={styles.label}>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </label>
              <br />
              <label className={styles.label}>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                />
              </label>
              <br />
              <button type="submit" className={styles.submitBtn}>
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default LoginRegister;
