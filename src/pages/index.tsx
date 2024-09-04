import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchInput from "@/components/SearchInput";
import ButtonActions from "@/components/ButtonActions";
import UsersTable from "@/components/UsersTable";
import { ApiResponse } from "@/types/ApiResponse";

const inter = Inter({ subsets: ["latin"] });

const validationSchema = Yup.object({
  users: Yup.array()
    .of(
      Yup.object({
        id: Yup.number(),
        firstName: Yup.string(),
        lastName: Yup.string(),
        position: Yup.string(),
        phone: Yup.string(),
        email: Yup.string().email("Invalid email address"),
      })
    )
    .required("At least one user is required"),
});

const HomeScreen: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { users: [] },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { replace } = useFieldArray({
    control,
    name: "users",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [originalState, setOriginalState] = useState<User[]>([]);
  const [currentState, setCurrentState] = useState<User[]>([]);
  const [changedFields, setChangedFields] = useState<{
    [key: number]: { [key in keyof User]?: boolean };
  }>({});

  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const data: ApiResponse<User[]> = await response.json();
        setOriginalState(data.data || []);
        setCurrentState(data.data || []);
        replace(data.data || []); // Update data dalam react-hook-form
      } catch (error) {
        alert("Failed fetch data")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async () => {
    if (!!errors.users) return;
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      });
      const data: ApiResponse<User[]> = await response.json();
      setOriginalState(currentState);
      setChangedFields({});
      replace(currentState);
    } catch (error) {
      alert("Failed to update users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: new Date().getTime(),
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      phone: "",
    };
    replace([newUser, ...currentState]);
    setCurrentState((prev) => [newUser, ...prev]);
    setOriginalState((prev) => [newUser, ...prev]);
  };

  const [renderGrid, setRenderGrid] = useState(0);

  const handleResetUser = () => {
    setCurrentState(originalState);
    replace(originalState);
    setChangedFields({});
    setRenderGrid((prev) => prev + 1);
  };

  const handleFieldChange = (
    index: number,
    field: keyof User,
    newValue: string
  ) => {
    const originalValue = originalState[index][field];
    const currentValue = newValue;

    setChangedFields((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: currentValue !== originalValue,
      },
    }));

    setCurrentState((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: newValue };
      return updated;
    });
  };

  const filteredUsers = originalState.filter((user) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.position.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.phone.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <main className={`min-h-screen bg-white ${inter.className}`}>
      {loading ? (
        <div className="text-center text-black text-5xl font-bold flex justify-center items-center min-h-screen">
          <p className="loading-text">
            Loading
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </p>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex justify-between items-center my-4">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ButtonActions
              handleAddUser={handleAddUser}
              onSubmit={onSubmit}
              handleResetUser={handleResetUser}
            />
          </div>
          <UsersTable
            key={renderGrid}
            filteredUsers={filteredUsers}
            handleFieldChange={handleFieldChange}
            control={control}
            errors={errors}
            changedFields={changedFields}
            onSubmit={onSubmit}
            currentState={currentState}
          />
        </div>
      )}
    </main>
  );
};

export default HomeScreen;
