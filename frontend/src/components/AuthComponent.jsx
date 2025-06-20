import { addToast, Button, Card, CardBody, Checkbox, Form, Input, Modal, ModalContent, Spinner, Tab, Tabs } from '@heroui/react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { setUserDetails } from '../store/userSliceRedux';

const AuthComponent = ({ isOpen, onOpenChange }) => {
  const [selected, setSelected] = useState("masuk");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
  const onSubmitLogin = async (e) => {
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
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  // fungsi submit register
  const onSubmitRegister = async (e) => {
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

      setLoading(true);

      const response = await FetchFromAxios({
        ...getAPI.register,
        data: data
      });


      // jika gagal 
      if (response.data.error) {
        addToast({
          title: response.data.message
        });
      }

      // jika berhasil
      if (response.data.success) {
        addToast({
          title: response.data.message
        });

        // hapus errors dan submit
        setErrors({});

        // redirect ke login
        setSelected("masuk");
      }

    } catch (error) {
      addToast({
        title: error.response.data.message
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <Modal isOpen={isOpen} placement="top-center" backdrop='blur' onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <div className="flex flex-col w-full">
              <Card className="">
                <CardBody className="overflow-hidden">
                  <Tabs
                    fullWidth
                    aria-label="Tabs form"
                    selectedKey={selected}
                    size="md"
                    onSelectionChange={setSelected}
                  >
                    {/* masuk */}
                    <Tab key="masuk" title="Masuk">
                      <Form
                        className="flex justify-center items-center"
                        validationErrors={errors}
                        onSubmit={onSubmitLogin}
                      >
                        <div className="flex flex-col gap-4 w-full">


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
                            {
                              loading ? (
                                <span className="flex items-center gap-2">
                                  <Spinner color="success" size="sm" variant="simple" />
                                  Loading
                                </span>
                              ) : (
                                "Masuk"
                              )
                            }
                          </Button>

                          <p className="text-xs mt-2">
                            Belum punya akun? <Link className="text-emerald-500 font-semibold" onClick={() => setSelected("daftar")}>Daftar</Link>
                          </p>
                        </div>
                      </Form>
                    </Tab>

                    {/* daftar */}
                    <Tab key="daftar" title="Daftar">
                      <Form
                        className=" flex justify-center items-center"
                        validationErrors={errors}
                        onSubmit={onSubmitRegister}
                      >
                        <div className="flex flex-col gap-4 w-full">

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
                            color="success"
                            onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
                          >
                            <p className="text-xs">Saya setuju dengan syarat dan ketentuan</p>
                          </Checkbox>

                          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

                          <Button className="w-full" color="success" type="submit" variant="bordered">
                            {
                              loading ? (
                                <span className="flex items-center gap-2">
                                  <Spinner color="success" size="sm" variant="simple" />
                                  Loading
                                </span>
                              ) : (
                                "Daftar"
                              )
                            }
                          </Button>
                          <p className="text-xs mt-2">Sudah punya akun? <Link className="text-emerald-500 cursor-pointer font-semibold" onClick={() => setSelected("masuk")}>Masuk</Link></p>
                        </div>

                      </Form>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AuthComponent
