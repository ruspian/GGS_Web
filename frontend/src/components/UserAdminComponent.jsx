import React, { useEffect, useMemo, useState } from 'react';
import { addToast, Avatar, Chip, Listbox, ListboxItem, ScrollShadow, Spinner } from '@heroui/react';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { useDispatch } from 'react-redux';
import { setAllAnggota } from '../store/anggotaSliceRedux'; // Asumsi action ini ada

// Wrapper untuk styling Listbox
export const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[400px] border-small px-1 py-2 rounded-lg border-default-200 dark:border-default-100 bg-white shadow-md">
    {children}
  </div>
);

const UserAdminComponent = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  // selectedUserIds akan menyimpan Set string ID dari user yang dipilih di Listbox
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());

  const dispatch = useDispatch();

  // Ambil data semua user
  const fetchAllUserData = async () => {
    try {
      setLoading(true);
      const response = await FetchFromAxios({
        ...getAPI.getAllUser, // Pastikan endpoint ini mengembalikan array objek user
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setAllUserData(response.data.data);
      } else {
        setAllUserData([]);
        addToast({ title: response.data.message || "Gagal memuat data pengguna.", variant: 'error' });
      }
    } catch (error) {
      console.error("Error fetching all user data:", error);
      setAllUserData([]);
      addToast({ title: error.response?.data?.message || "Kesalahan mengambil data pengguna.", variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);


  // Fungsi user => anggota
  const handleClickChip = async (userId) => {

    if (!userId) {
      addToast({ title: "ID anggota tidak valid.", variant: 'error' });
      return;
    }

    try {
      const response = await FetchFromAxios({
        ...getAPI.createAnggota,
        data: {
          _id: userId
        }
      });


      if (response.data.success) {
        addToast({ title: response.data.message, variant: 'success' });
        // Jika backend mengembalikan data anggota yang baru dibuat, dispatch ke Redux
        dispatch(setAllAnggota(response.data.data));
      } else {
        addToast({ title: response.data.message, variant: 'error' });
      }
    } catch (error) {
      console.error("Error menjadikan anggota:", error.response?.data?.message || error.message);
      addToast({ title: error.response?.data?.message || "Kesalahan saat menjadikan anggota.", variant: 'error' });
    }
  };

  // Ubah Set `selectedUserIds` ke Array untuk digunakan di `topContent`
  // Gunakan `useMemo` untuk performa
  const arraySelectedUserIds = useMemo(() => Array.from(selectedUserIds), [selectedUserIds]);

  // Buat top content 
  const topContent = useMemo(() => {
    // Jika tidak ada user yang dipilih ATAU data user belum dimuat
    if (!arraySelectedUserIds.length || allUserData.length === 0) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1 overflow-x-auto"
        orientation="horizontal"
      >
        {/* Karena selectionMode="single", arraySelectedUserIds hanya akan punya 0 atau 1 item */}
        {arraySelectedUserIds.map((userId) => {
          // Cari user yang dipilih
          // Tampilkan chip "Jadikan Anggota" hanya jika user ditemukan
          const user = allUserData.find((u) => u._id === userId);
          return user ? (
            <Chip
              className='cursor-pointer'
              onClick={() => handleClickChip(user._id)}
              key={user._id}
              color="primary"
              variant="flat"
            >
              Jadikan {user.name} Anggota
            </Chip>
          ) : null;
        })}
      </ScrollShadow>
    );
  }, [arraySelectedUserIds.length, allUserData, arraySelectedUserIds]);


  // Render loading state
  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <Spinner size='lg' color='emerald' label='Memuat data pengguna...' />
      </div>
    );
  }

  // Render komponen utama
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-3xl font-extrabold text-emerald-700'>Manajemen User</h1>
        <hr className='border-t-2 border-emerald-400 w-24 mt-2 mb-4' />
      </div>
      <ListboxWrapper>
        <Listbox
          classNames={{
            base: "max-w-md w-full",
            list: "max-h-[300px] overflow-y-auto",
          }}
          selectedKeys={selectedUserIds}
          items={allUserData}
          label="Pilih User untuk Dijadikan Anggota"
          selectionMode="single"
          topContent={topContent}
          variant="flat"
          // Pastikan onSelectionChange hanya menyimpan string ID murni
          onSelectionChange={(keys) => {
            const newSelectedKeys = new Set(Array.from(keys).map(key => {
              if (typeof key === 'object' && key !== null && (key.anchorKey || key.currentKey)) {
                return String(key.anchorKey || key.currentKey);
              }
              return String(key);
            }));
            setSelectedUserIds(newSelectedKeys);
          }}
        >
          {(item) => (
            <ListboxItem key={item._id} textValue={item.name}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.name || "User Avatar"}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.avatar || "https://i.pravatar.cc/150?u=a04258114e29026702d"}
                />
                <div className="flex flex-col">
                  <span className="text-small font-semibold">{item.name || "Nama Pengguna"}</span>
                  <span className="text-tiny text-default-400">{item.email || "Email Pengguna"}</span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
};

export default UserAdminComponent;
