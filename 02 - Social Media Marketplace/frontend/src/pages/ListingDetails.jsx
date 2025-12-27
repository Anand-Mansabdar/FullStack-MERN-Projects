import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfileLink, platformIcons } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  ArrowUpRightFromSquare,
  ArrowUpRightFromSquareIcon,
  Calendar,
  CalendarIcon,
  CheckCircle2,
  ChevronLeftIcon,
  ChevronRightIcon,
  DollarSign,
  Eye,
  LineChart,
  Loader2Icon,
  MapPin,
  MessageSquareMoreIcon,
  ShoppingBagIcon,
  Users,
} from "lucide-react";
import { setChat } from "../app/features/ChatSlice";

const ListingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [listing, setListing] = useState(null);
  const [current, setCurrent] = useState(0);
  const images = listing?.images || "";
  const profileLink =
    listing && getProfileLink(listing.platform, listing.username);
  const { listingId } = useParams();
  const { listings } = useSelector((state) => state.listing);

  const navigatePrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const navigateNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleChat = () => {
    dispatch(setChat({ listing: listing }));
  };

  const handlePurchase = async () => {};

  useEffect(() => {
    const listing = listings.find((listing) => listing.id === listingId);

    if (listing) {
      setListing(listing);
    }
  }, [listingId, listings]);
  return listing ? (
    <div className="mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-neutral-600 py-5"
      >
        <ArrowLeftIcon className="size-4" />
        Go to previous page
      </button>

      <div className="flex items-start max-md:flex-col gap-10">
        <div className="flex-1 max-md:w-full">
          {/* Top section - Displaying platform title and other details */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl">
                  {platformIcons[listing.platform]}
                </div>
                <div className="">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-800 ">
                    {listing.title}
                    <Link target="_blank" to={profileLink}>
                      <ArrowUpRightFromSquareIcon className="size-4 hover:text-indigo-500" />
                    </Link>
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    @{listing.username} •{" "}
                    {listing.platform?.charAt(0).toUpperCase() +
                      listing.platform?.slice(1)}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {listing.verified && (
                      <span className="flex items-center text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md ">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    {listing.monetized && (
                      <span className="flex items-center text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md ">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Monetized
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-neutral-800">
                  {currency}
                  {listing.price?.toLocaleString()}
                </h3>
                <p className="text-sm text-neutral-500">USD</p>
              </div>
            </div>
          </div>

          {/* Screenshot Section */}
          {images?.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 mb-5 overflow-hidden">
              <div className="p-4">
                <h4 className="font-semibold text-neutral-800">
                  Screenshots & Proofs
                </h4>
              </div>
              {/* Slider Container */}
              <div className="relative w-full aspect-video overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Listing Proof"
                      className="w-full shrink-0"
                    />
                  ))}
                </div>

                {/* Image navigation buttons */}
                <button
                  onClick={navigatePrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-neutral-700" />
                </button>

                <button
                  onClick={navigateNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                >
                  <ChevronRightIcon className="w-5 h-5 text-neutral-700" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      onClick={() => setCurrent(index)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        current === index ? "bg-indigo-600" : "bg-neutral-600"
                      } `}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="bg-white rounded-xl border border-neutral-200 mb-5">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-neutral-800">
                Account Metrics
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center">
              <div>
                <Users className="mx-auto text-neutral-400 w-5 h-5 mb-1" />
                <p className="font-semibold text-neutral-800">
                  {listing.followers_count?.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500">Followers</p>
              </div>

              <div>
                <LineChart className="mx-auto text-neutral-400 w-5 h-5 mb-1" />
                <p className="font-semibold text-neutral-800">
                  {listing.engagement_rate}%
                </p>
                <p className="text-xs text-neutral-500">Engagement</p>
              </div>

              <div>
                <Eye className="mx-auto text-neutral-400 w-5 h-5 mb-1" />
                <p className="font-semibold text-neutral-800">
                  {listing.monthly_views?.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500">Monthly Views</p>
              </div>

              <div>
                <Calendar className="mx-auto text-neutral-400 w-5 h-5 mb-1" />
                <p className="font-semibold text-neutral-800">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-neutral-500">Listed On</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-neutral-200 mb-5">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-neutral-800">Description</h4>
            </div>
            <div className="p-4 text-sm text-gray-600">
              {listing.description}
            </div>
          </div>
          {/* Additional Details */}
          <div className="bg-white rounded-xl border border-neutral-200 mb-5">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-neutral-800">
                Additional Details
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-sm">
              <div>
                <p className="text-neutral-600">Niche</p>
                <p className="font-medium capitalize">{listing.niche}</p>
              </div>

              <div>
                <p className="text-neutral-600">Primary Country</p>
                <p className="font-medium flex items-center">
                  <MapPin className="size-4 mr-1 text-gray-400" />
                  {listing.country}
                </p>
              </div>

              <div>
                <p className="text-neutral-600">Audience Age</p>
                <p className="font-medium">{listing.age_range}</p>
              </div>

              <div>
                <p className="text-neutral-600">Platform Verified</p>
                <p className="font-medium">
                  {listing.platformAssured ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <p className="text-neutral-600">Monetization</p>
                <p className="font-medium">
                  {listing.monetized ? "Enabled" : "Disabled"}
                </p>
              </div>

              <div>
                <p className="text-neutral-600">Status</p>
                <p className="font-medium capitalize">{listing.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info and Purchasing Options */}
        <div
          className="bg-white min-w-full md:min-w-92.5 rounded-xl border border-gray-200 p-5 max-md:mb-10
        "
        >
          <h4 className="font-semibold text-neutral-800 mb-4">
            Seller Information
          </h4>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={listing.owner?.image}
              alt="Seller Image"
              className="size-10 rounded-full"
            />
            <div>
              <p className="font-medium text-neutral-800">
                {listing.owner?.name}
              </p>
              <p className="text-sm text-neutral-500">{listing.owner?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-4 ">
            <p>
              Member Since{" "}
              <span className="font-medium">
                {new Date(listing.owner?.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          <button
            onClick={handleChat}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center gap-2 "
          >
            <MessageSquareMoreIcon className="size-4" />
            Chat
          </button>

          {listing.isCredentialChanged && (
            <button
              onClick={handlePurchase}
              className="w-full mt-2 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition text-sm font-medium flex items-center justify-center gap-2 "
            >
              <ShoppingBagIcon className="size-4" />
              Purchase
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-4 text-center mt-28">
        <p className="text-sm text-gray-500">
          © 2025{" "}
          <span className="text-[#ff4500]">Anand Mansabdar - MERN Project</span>
          . All Rights Reserved
        </p>
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <Loader2Icon className="size-7 animate-spin text-indigo-600" />
    </div>
  );
};

export default ListingDetails;
