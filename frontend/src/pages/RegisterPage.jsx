import React, { useState } from "react";
import { Card, Form, Input, Checkbox, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import FetchFromAxios from "../../utils/AxiosUtil";
import getAPI from "../common/getAPI";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  const onSubmit = async (e) => {
    e.preventDefault();

    // ubah inputan ke object dan ambil data inputan 
    const data = Object.fromEntries(new FormData(e.currentTarget));

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

    // kirim data ke backend
    try {
      const response = await FetchFromAxios({
        ...getAPI.register,
        data: data
      });


      // jika gagal 
      if (response.data.error) {
        console.log(response.data.message);
      }

      // jika berhasil
      if (response.data.success) {
        console.log(response.data.message);

        // hapus errors dan submit
        setErrors({});

        // redirect ke halaman login
        navigate("/masuk");
      }

    } catch (error) {
      console.log(error);

    }


  };

  return (
    <Card className="py-16 lg:py-16 lg:my-5 lg:w-80 lg:h-[70%] lg:mx-auto flex items-center justify-center" shadow="sm" >
      <Form
        className="lg:w-72 flex justify-center items-center space-y-4"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-2xl font-bold">Daftar Akun</h2>
          <hr className="border-gray-300 mb-3" />
          {/* nama */}
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Mohon isi nama anda!";
              }

              return errors.name;
            }}
            label="Nama"
            labelPlacement="outside"
            name="name"
            placeholder="Masukkan nama anda"
          />

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
          <p className="text-xs">Sudah punya akun? <Link className="text-emerald-500 cursor-pointer font-semibold" to="/masuk">Masuk</Link></p>
        </div>
      </Form>
    </Card>
  );
}

export default RegisterPage;
