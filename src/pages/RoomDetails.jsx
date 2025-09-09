import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import assets, { facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    if (room) {
      setRoom(room);
      setMainImage(room.images[0]);
    }
  }, [id]);

   // ✅ Price ko INR format me dikhane ke liye helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm"> ({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image ? "outline-3 outline-orange-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* ✅ Room price in Indian Rupees */}
          <p className="text-2xl font-medium">
            {formatPrice(room.pricePerNight)} <span className="text-base">per night</span>
          </p>
        </div>
        {/* CheckIn checkOut Form */}
        <form
          className="flex flex-col md:flex-row justify-between items-start md:items-center
    bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)]
    p-6 rounded-xl mx-auto mt-16 max-w-6xl gap-6"
        >
          {/* Left: Input Fields */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 flex-wrap">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                placeholder="0"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          {/* Right: Book Now Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull active:scale-95 transition-all
            text-white rounded-md w-full md:w-auto px-8 py-3 text-base cursor-pointer whitespace-nowrap"
            >
              Check Availability
            </button>
          </div>
        </form>

        {/* Common Specification */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec,index)=>(
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
              <div>
                  <p className="text-base">{spec.title}</p>
                  <p className="text-gray-500">{spec.description}</p>
              </div>

            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Aliquam, commodi. Sint tempora, harum blanditiis,
             repellat deleniti magni numquam illum quisquam qui nulla
             molestiae in praesentium suscipit provident, fugit et optio.</p>
        </div>

        {/* Hosted by */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img src={assets.ownerImage} alt="Host" 
            className="h-14 w-14 md:h-18 md:w-18 rounded-full"/>

            <div>
                <p className="text-lg md:text-xl">
                   Hosted By {room.hotel.owner.username}
                </p>
              {/* <p className="text-lg md:text-xl">Hosted By Mr.Amar Singh {room.hotel.name}</p> */}
              <div className="flex items-center mt-1">
                <StarRating/>
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary
          hover:bg-amber-600 transition-all cursor-pointer">Contact Now</button>

        </div>
      </div>
    )
  );
};

export default RoomDetails;
