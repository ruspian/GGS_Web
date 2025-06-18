import React, { useState } from "react";
import { Card, Form, Input, Checkbox, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import FetchFromAxios from "../../utils/AxiosUtil";
import getAPI from "../common/getAPI";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSliceRedux";

const MasukPage = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password minimal 4 karakter";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password minimal 1 huruf besar";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password minimal 1 huruf kecil";
    }

    return null;
  };

  // fungsi untuk mengambil data detail user
  const fetchUserDetails = async () => {
    try {

      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("Token tidak ditemukan");
        return null;
      }


      const response = await FetchFromAxios({
        ...getAPI.user_details,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // jika gagal
      if (response.data.error) {
        console.log(response.data.message);
      }

      // jika berhasil 
      return response.data || response.data.data
    } catch (error) {
      console.log(error);

    }
  }


  // fungsi submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    // ambil data inputan
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('event', Object);


    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Silahkan setujui syarat dan ketentuan" });

      return;
    }

    try {
      // kirim data ke backend
      const response = await FetchFromAxios({
        ...getAPI.login,
        data: data
      })

      // cek jika gagal
      if (response.data.error) {
        console.log(response.data.message);
      }

      // jika sukses
      if (response.data.success) {

        console.log(response.data.message);

        // simpan token ke local storage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // simpan data user ke redux
        const getUserDetail = await fetchUserDetails();
        dispatch(setUserDetails(getUserDetail));

        // bersihkan error 
        setErrors({});

        // redirect ke halaman utama
        navigate("/");

      }
    } catch (error) {
      console.log(error);

    }
  };


  return (
    <Card className="py-16 lg:py-16 mb-20 lg:my-10 lg:w-80 lg:h-[70%] lg:mx-auto flex items-center justify-center" shadow="sm" >
      <Form
        className="lg:w-72 flex justify-center items-center space-y-4"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-2xl font-bold">Masuk</h2>
          <hr className="border-gray-300 mb-3" />

          {/* email */}
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Mohon isi email anda!";
              }
              if (validationDetails.typeMismatch) {
                return "Email tidak valid!";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Masukkan email anda"
            type="email"
          />

          {/* password */}
          <Input
            isRequired
            errorMessage={getPasswordError(password)}
            isInvalid={getPasswordError(password) !== null}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Masukkan password anda"
            type="password"
            value={password}
            onValueChange={setPassword}
          />

          {/* term */}
          <Checkbox
            isRequired
            classNames={{
              label: "text-small",
            }}
            isInvalid={!!errors.terms}
            name="terms"
            validationBehavior="aria"
            value="true"
            onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
          >
            <p className="text-xs">Saya setuju dengan syarat dan ketentuan</p>
          </Checkbox>

          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex gap-4">
            <Button className="w-full" color="success" type="submit" variant="bordered">
              Daftar
            </Button>
          </div>
        </div>

        <div className="">
          <p className="text-xs">Belum punya akun? <Link className="text-emerald-500 cursor-pointer font-semibold" to="/daftar">Daftar</Link></p>
        </div>
      </Form>
    </Card>
  );
}

export default MasukPage;
