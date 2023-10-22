import React, { useEffect, useState } from 'react';
import firestore from "./config/firebase" // Pastikan Anda menyesuaikan dengan lokasi berkas Firebase Anda
import { collection, getDocs } from 'firebase/firestore'; // Mengimpor fungsi yang diperlukan

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Membaca data dari Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            name: data.name,
            age: data.age,
            gambar1:data.gambar1
          });
        });
        setUserData(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Pengguna dari Firestore</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            Nama: {user.name}, Usia: {user.age}
            <img src={user.gambar1} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
