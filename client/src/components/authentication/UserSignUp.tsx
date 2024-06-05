import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ShortUniqueId from "short-unique-id";
const UserSignUp = () => {
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const enteredOTP = useRef<HTMLInputElement | null>(null);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // const toggleModal = async () => {
  //   try {
  //     const email = emailRef.current?.value;

  //     if (!email) {
  //       errors.email = "Email is required";

  //     } else if (
  //       !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  //         email,
  //       )
  //     ) {
  //       errors.email = "Email address is invalid";
  //       return
  //     }

  //     const newUser = new ShortUniqueId({ length: 10 });
  //     setUserId(newUser);

  //     const data = emailRef.current!.value
  //     const result = await axios.get("http://localhost:8080/checkEmail", {
  //       params:{data} ,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     if(result.data !== ''){
  //       errors.email = "User already exists";
  //       return
  //     }
  //     const verifyEmail = new FormData();

  //     verifyEmail.append("email", data);
  //     verifyEmail.append("user", newUser);

  //     console.log(verifyEmail)

  //     const verification = await axios.post(
  //       "http://localhost:8080/verification",
  //       verifyEmail,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       },
  //     );
  //     console.log(verification?.data)

  //   } catch (error) {
  //     console.log(error);
  //     return
  //   }
  //   setIsModalOpen(!isModalOpen);
  // };

  const toggleModal = async () => {
    try {
      const email = emailRef.current?.value;

      if (!email) {
        setErrors({ ...errors, email: "Email is required" });
        return;
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email,
        )
      ) {
        setErrors({ ...errors, email: "Email address is invalid" });
        return;
      }
      const result = await axios.get("http://localhost:8080/checkEmail", {
        params: { email },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.data.exists) {
        setErrors({ ...errors, email: "User already exists" });
        return;
      }
      const emailId = email;
      const verification = await axios.get(
        "http://localhost:8080/emailVerification",
        {
          params: { emailId },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(verification.data);
    } catch (error) {
      console.error(error);
    }

    setIsModalOpen(!isModalOpen);
  };

  const verifyOTP = async () => {
    try {
      const data = new FormData();
      data.append("otp", enteredOTP.current!.value);
      data.append("email", emailRef.current!.value);
      const result = await axios.post("http://localhost:8080/verifyOTP", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOtpError(result?.data?.message);

      if (result?.data?.message === "Sucess") {
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const validate = () => {
    const errors: { [key: string]: string } = {};

    const fullName = fullNameRef.current?.value;
    // const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!fullName) {
      errors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(fullName)) {
      errors.fullName = "Enter a Valid Name";
    }

    if (!isEmailVerified) {
      errors.email = "Please Verify Email";
    }

    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        password,
      )
    ) {
      errors.password = "Password must meet the criteria";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!profileImage || !isImageFile(profileImage.name)) {
      errors.profileImage = "Profile image is required";
    }

    return errors;
  };

  const isImageFile = (fileName: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension && imageExtensions.includes(extension);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const data = new FormData();
      data.append("username", fullNameRef.current!.value);
      data.append("email", emailRef.current!.value);
      data.append("phone", phoneRef.current!.value);
      data.append("password", passwordRef.current!.value);
      if (profileImage) {
        data.append("image", profileImage);
      }
      if (locationData) {
        data.append("location", JSON.stringify(locationData));
      }

      const result = await axios.post(
        "http://localhost:8080/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setOtpError(result?.data?.message);
      console.log(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  async function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          if (res.status === 200) {
            setLocationData(res.data);
          }
        },
        (error) => {
          console.error(error);
          getLocationFromIP();
        },
      );
    } else {
      getLocationFromIP();
    }
  }

  async function getLocationFromIP() {
    try {
      const res = await axios.get("http://ip-api.com/json");
      if (res.status === 200) {
        setLocationData(res.data);
      }
    } catch (error) {
      console.error("IP location fetch error:", error);
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfileImage(file);
  };

  return (
    <div className="bg-white-100 flex min-h-screen items-center justify-center">
      <form
        className="mx-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
        onSubmit={onSubmit}
      >
        <div>
          <h1 className="mb-5 text-center font-serif text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Create Your Account{" "}
          </h1>
        </div>

        <div className="mb-5 flex flex-col items-center">
          <label className="relative flex h-32 w-32 transform cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-lg font-medium text-white">
                <span className="mb-1">Add Image</span>
                <span role="img" aria-label="camera">
                  📷
                </span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              ref={profileImageRef}
            />
          </label>
          {errors.profileImage && (
            <p className="mt-1 text-xs text-red-500">{errors.profileImage}</p>
          )}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="fullName"
            id="floating_text"
            className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            ref={fullNameRef}
            required
          />
          <label
            htmlFor="floating_text"
            className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Full Name
          </label>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="group relative z-0 mb-5 flex w-full items-center">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="text-md peer block w-full flex-grow appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            ref={emailRef}
            required
          />
          <button
            type="button"
            className={`ml-2 rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 ${
              isEmailVerified
                ? "bg-green-500 text-white dark:bg-green-500"
                : "bg-blue-700 dark:bg-blue-600"
            } hover:${isEmailVerified ? "bg-green-500" : "bg-blue-800"} dark:hover:${isEmailVerified ? "bg-green-500" : "dark:bg-blue-700"}
  `}
            onClick={!isEmailVerified && toggleModal}
          >
            {isEmailVerified ? "Verified" : "Verify"}
          </button>

          <label
            htmlFor="floating_email"
            className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email address
          </label>
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="tel"
              name="phone"
              id="floating_phone"
              className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              ref={phoneRef}
              required
            />
            <label
              htmlFor="floating_phone"
              className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Phone Number
            </label>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="location"
              id="floating_company"
              className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              value={
                locationData
                  ? `${locationData.city}, ${locationData.countryName}`
                  : ""
              }
              readOnly
              ref={locationRef}
              required
            />
            <label
              htmlFor="floating_company"
              className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Location
            </label>
          </div>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="floating_password"
            className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            ref={passwordRef}
            required
          />
          <label
            htmlFor="floating_password"
            className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Password
          </label>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="confirmPassword"
            id="floating_repeat_password"
            className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            ref={confirmPasswordRef}
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="text-md absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Confirm password
          </label>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-md w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <div>
        <p className="p-2 font-serif ">Already on the Town ? <Link to="/"><span className="font-bold ">Click Here</span></Link></p>

       </div>
      </form>
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Verify Email
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-4 p-4 md:p-5">
                <p className="text-center text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  To Continue Further you have to complete this verification
                </p>
                <p className="text-center text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  OTP have been sented to yuor Email Id
                </p>
                <div>
                  <label
                    htmlFor="otp"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Entered The OTP
                  </label>

                  <input
                    type="number"
                    id="otp"
                    ref={enteredOTP}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="OTP"
                    required
                  />
                </div>
                {otpError && (
                  <p className="mt-1 text-xs text-red-500">{otpError}</p>
                )}
              </div>
              <div className="flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
                <button
                  onClick={verifyOTP}
                  type="button"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Verify
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSignUp;
