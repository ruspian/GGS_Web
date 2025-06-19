import React, { useState } from "react";
import { addToast, Card, Form, Input, Checkbox, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSliceRedux";

const MasukPage = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // validasi password
  const getPasswordError = (value) => {
    if (value.length < 4) return "Password minimal 4 karakter";
    if ((value.match(/[A-Z]/g) || []).length < 1) return "Minimal 1 huruf besar";
    if ((value.match(/[^a-z]/gi) || []).length < 1) return "Minimal 1 huruf kecil";
    return null;
  };

  // fungsi submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors = {};
    const passwordError = getPasswordError(data.password);
    if (passwordError) newErrors.password = passwordError;
    if (data.terms !== "true") newErrors.terms = "Silahkan setujui syarat dan ketentuan";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // login ke server
      const response = await FetchFromAxios({
        ...getAPI.login,
        data,
        withCredentials: true, // ini penting jika kamu pakai cookie
      });

      if (response.data.error) {
        addToast({ title: response.data.message });
        return;
      }

      // simpan token (kalau backend kirim via JSON)
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      // ambil data user langsung (agar Redux langsung update)
      const resUser = await FetchFromAxios({
        ...getAPI.user_details,
        headers: {
          Authorization: `Bearer ${response.data.data.accessToken}`,
        },
        withCredentials: true,
      });

      if (!resUser.data.error) {
        dispatch(setUserDetails(resUser.data.data));
      }

      addToast({ title: "Login berhasil!", color: "success" });
      navigate("/");

    } catch (err) {
      addToast({ title: err?.response?.data?.message || "Gagal login" });
    }
  };



  return (
    <Card className="py-16 lg:py-16 mb-20 lg:my-10 lg:w-80 lg:h-[70%] lg:mx-auto flex items-center justify-center" shadow="sm">
      <Form
        className="lg:w-72 flex justify-center items-center space-y-4"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-2xl font-bold">Masuk</h2>
          <hr className="border-gray-300 mb-3" />

          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Masukkan email anda"
            type="email"
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) return "Mohon isi email!";
              if (validationDetails.typeMismatch) return "Email tidak valid!";
            }}
          />

          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Masukkan password"
            type="password"
            value={password}
            onValueChange={setPassword}
            errorMessage={getPasswordError(password)}
            isInvalid={getPasswordError(password) !== null}
          />

          <Checkbox
            isRequired
            classNames={{ label: "text-small" }}
            isInvalid={!!errors.terms}
            name="terms"
            value="true"
            color="success"
            onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
          >
            <p className="text-xs">Saya setuju dengan syarat dan ketentuan</p>
          </Checkbox>
          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <Button className="w-full" color="success" type="submit" variant="bordered">
            Masuk
          </Button>

          <p className="text-xs mt-2">
            Belum punya akun? <Link className="text-emerald-500 font-semibold" to="/daftar">Daftar</Link>
          </p>
        </div>
      </Form>
    </Card>
  );
};

export default MasukPage;
