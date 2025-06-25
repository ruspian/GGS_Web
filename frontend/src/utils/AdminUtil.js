const Admin = (str) => {
  // cek apakah yang sedang login adalah admin
  if (str === "Admin") {
    // jika iya
    return true;
  }

  // jika tidak
  return false;
};

export default Admin;
