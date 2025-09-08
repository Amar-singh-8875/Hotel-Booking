import React from "react";
import { useLocation } from "react-router-dom";
import { roomsDummyData, facilityIcons } from "../assets/assets";

const SearchResults = () => {
  const location = useLocation();
  const { destination, checkIn, checkOut, guests } = location.state || {};

  // ✅ filter rooms based on city
  const filteredRooms = roomsDummyData.filter(
    (room) =>
      room.hotel.city.toLowerCase() === destination?.toLowerCase() &&
      room.isAvailable
  );

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for{" "}
        <span className="text-blue-600">{destination}</span>
      </h2>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Room Image */}
              <img
                src={room.images[0]}
                alt={room.roomType}
                className="w-full h-48 object-cover"
              />

              {/* Room Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {room.hotel.name} - {room.roomType}
                </h3>
                <p className="text-sm text-gray-500">{room.hotel.address}</p>

                {/* Price */}
                <p className="mt-2 text-blue-600 font-bold">
                  ${room.pricePerNight}{" "}
                  <span className="text-sm text-gray-500">/ night</span>
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {room.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                    >
                      <img
                        src={facilityIcons[amenity]}
                        alt={amenity}
                        className="w-4 h-4"
                      />
                      {amenity}
                    </div>
                  ))}
                </div>

                {/* Dates + Guests */}
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    <span className="font-medium">Check-in:</span> {checkIn}
                  </p>
                  <p>
                    <span className="font-medium">Check-out:</span> {checkOut}
                  </p>
                  <p>
                    <span className="font-medium">Guests:</span> {guests}
                  </p>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No hotels found for{" "}
          <span className="font-medium">{destination}</span>. Try another
          search.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
