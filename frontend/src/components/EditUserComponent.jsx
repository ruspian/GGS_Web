import { Button, Card, CardBody, CardHeader, Form, Image, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const EditUserComponent = () => {
  const [errors, setErrors] = useState({});

  const userDetail = useSelector((state) => state.user);

  console.log("userDetail", userDetail);


  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.username) {
      setErrors({ username: "Username is required" });

      return;
    }

    const result = data;

    setErrors(result.errors);
  };

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='lg:mx-0 mx-2'>
        <Card>
          <CardHeader>
            <h3 className='text-xl font-bold '>Edit Profil</h3>
          </CardHeader>
          <CardBody className="overflow-visible">

            <div className="flex flex-col lg:flex-row overflow-auto gap-4">
              <Form
                className="w-full max-w-xs flex flex-col gap-3"
                validationErrors={errors}
                onSubmit={onSubmit}
              >
                {/* tampilan gambar */}
                <Image
                  src={userDetail.avatar}
                  alt="profil"
                  width={100}
                  height={100}
                  radius='sm'
                />

                {/* gambar */}
                <Input
                  label="Profil"
                  labelPlacement="outside"
                  name="profil"
                  variant='bordered'
                  placeholder="Profil anda!"
                  type="file"
                />
                <Input
                  label="Username"
                  labelPlacement="outside"
                  name="username"
                  variant='bordered'
                  placeholder="Nama anda!"
                />
                <Button type="submit" variant="flat">
                  Submit
                </Button>
              </Form>

            </div>
          </CardBody>
        </Card>
      </div>

    </div>
  )
}

export default EditUserComponent
