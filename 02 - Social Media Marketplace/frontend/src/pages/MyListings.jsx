import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownCircleIcon,
  BanIcon,
  CheckCircle,
  Clock,
  CoinsIcon,
  DollarSign,
  Edit,
  Eye,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  Plus,
  StarIcon,
  TrashIcon,
  TrendingUp,
  TrendingUpIcon,
  Users,
  WalletIcon,
  XCircle,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { platformIcons } from "../assets/assets";
import CredentialSubmission from "../components/CredentialSubmission";
import WithdrawModal from "../components/WithdrawModal";

const MyListings = () => {
  const { userListings, balance } = useSelector((state) => state.listing);
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  // States
  const [showCredentialsSubmission, setShowCredentialsSubmission] =
    useState(null);
  const [showWithdrawl, setShowWithdrawl] = useState(null);

  const totalValue = userListings.reduce(
    (sum, listing) => sum + (listing.price || 0),
    0
  );
  const activeListings = userListings.filter(
    (listing) => listing.status === "active"
  ).length;
  const soldListings = userListings.filter(
    (listing) => listing.status === "sold"
  ).length;

  const formatNumber = (number) => {
    if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    return number?.toString() || 0;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-3.5" />;
      case "ben":
        return <BanIcon className="size-3.5" />;
      case "sold":
        return <DollarSign className="size-3.5" />;
      case "inactive":
        return <XCircle className="size-3.5" />;
      default:
        return <Clock className="size-3.5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "ben":
        return "text-red-600";
      case "sold":
        return "text-indigo-600";
      case "inactive":
        return "text-neutral-600";
      default:
        return "text-neutral-600";
    }
  };

  const toggleStatus = async (listingId) => {};

  const deleteListing = async (listingId) => {};

  const markAsFeatured = async (listingId) => {};
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">My Listings</h1>
          <p className="text-neutral-600 mt-1">
            Manage your social media account listings.
          </p>
        </div>
        <button
          onClick={() => navigate("/create-listing")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="size-4" />
          <span>New Listing</span>
        </button>
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Listings"
          value={userListings.length}
          icon={<Eye className="size-6 text-indigo-600" />}
          color="indigo"
        />
        <StatCard
          title="Active Listings"
          value={activeListings}
          icon={<CheckCircle className="size-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Sold"
          value={soldListings}
          icon={<TrendingUp className="size-6 text-indigo-600" />}
          color="indigo"
        />
        <StatCard
          title="Total Value"
          value={`${currency}${totalValue.toLocaleString()}`}
          icon={<DollarSign className="size-6 text-yellow-600" />}
          color="yellow"
        />
      </div>

      {/* Balance Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 xl:gap-20 p-6 mb-10 bg-white rounded-xl border border-neutral-200">
        {[
          { label: "Earned", value: balance.earned, icon: WalletIcon },
          {
            label: "Withdrawn",
            value: balance.withdrawn,
            icon: ArrowDownCircleIcon,
          },
          { label: "Available", value: balance.available, icon: CoinsIcon },
        ].map((item, index) => (
          <div
            onClick={() => item.label === "Available" && setShowWithdrawl(true)}
            className="flex flex-1 items-center justify-between p-4 rounded-lg border border-neutral-100 cursor-pointer"
            key={index}
          >
            <div className="flex items-center gap-3">
              <item.icon className="text-neutral-500 w-6 h-6" />
              <span className="font-medium text-neutral-600">{item.label}</span>
            </div>
            <span className="text-xl font-medium text-neutral-700">
              {currency}
              {item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Listings */}
      {userListings.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-16 text-center">
          <div className="w-16 h-1/6 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-medium text-neutral-800 mb-2">
            No Listings Yet
          </h3>
          <p className="text-neutral-600 mb-6">
            Start by creating your first listing.
          </p>
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium"
          >
            Create First Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg border border-neutral-200 hover:shadow-lg shadow-gray-200/70 transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 justify-between mb-4">
                  {platformIcons[listing.platform]}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-neutral-800">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="relative group">
                          <LockIcon size={14} />
                          <div className="invisible group-hover:visible absolute right-0 top-0 pt-4.5 z-10">
                            <div className="bg-white text-neutral-600 text-xs rounded border border-neutral-200 p-2 px-3">
                              {!listing.isCredentialSubmitted && (
                                <>
                                  <button
                                    onClick={() =>
                                      setShowCredentialsSubmission(listing)
                                    }
                                    className="flex items-center gap-2 text-nowrap"
                                  >
                                    Add Credentials
                                  </button>
                                  <hr className="border-neutral-200 my-2" />
                                </>
                              )}
                              <button className="text-nowrap">
                                Status:{" "}
                                <span
                                  className={
                                    listing.isCredentialSubmitted
                                      ? listing.isCredentialVerified
                                        ? listing.isCredentialChanged
                                          ? "text-green-600"
                                          : "text-indigo-600"
                                        : "text-amber-600"
                                      : "text-red-600"
                                  }
                                >
                                  {listing.isCredentialSubmitted
                                    ? listing.isCredentialVerified
                                      ? listing.isCredentialChanged
                                        ? "Changed"
                                        : "Verified"
                                      : "Submitted"
                                    : "Not Submitted"}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        {listing.status === "active" && (
                          <StarIcon
                            onClick={() => markAsFeatured(listing.id)}
                            size={18}
                            className={`text-yellow-500 cursor-pointer ${
                              listing.featured && "fill-yellow-500"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      <span>@{listing.username}</span>
                    </p>
                  </div>
                </div>

                {/* Displaying followers count */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="size-4 text-neutral-400" />
                      <span>
                        {formatNumber(listing.followers_count)} followers
                      </span>
                    </div>
                    <span
                      className={`flex capitalize items-center justify-end gap-1 font-medium ${getStatusColor(
                        listing.status
                      )} `}
                    >
                      {getStatusIcon(listing.status)}{" "}
                      <span>{listing.status}</span>
                    </span>

                    {/* Engagement */}
                    <div className="flex items-center space-x-2">
                      <TrendingUpIcon className="size-4 text-neutral-400" />
                      <span>{listing.engagement_rate}% engagement</span>
                    </div>
                  </div>

                  {/* Priciing */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-2xl font-bold text-neutral-800">
                      {currency}
                      {listing.price.toLocaleString()}
                    </span>

                    <div className="flex items-center space-x-2">
                      {listing.status !== "sold" && (
                        <button
                          onClick={() => deleteListing(listing.id)}
                          className="p-2 border border-neutral-300 rounded-lg hover:bg-gray-50 hover:text-red-500"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/edit-listing/${listing.id}`)}
                        className="p-2 border border-neutral-300 rounded-lg hover:bg-gray-50 hover:text-indigo-500"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(listing.id)}
                        className="p-2 border border-neutral-300 rounded-lg hover:bg-gray-50 hover:text-purple-500"
                      >
                        {listing.status === "active" && (
                          <EyeOffIcon className="size-4" />
                        )}
                        {listing.status !== "active" && (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCredentialsSubmission && (
        <CredentialSubmission
          listing={showCredentialsSubmission}
          onClose={() => setShowCredentialsSubmission(null)}
        />
      )}

      {showWithdrawl && (
        <WithdrawModal onClose={() => setShowWithdrawl(null)} />
      )}

      <div className="bg-white border-t border-gray-200 p-4 text-center mt-28">
        <p className="text-sm text-gray-500">
          © 2025{" "}
          <span className="text-[#ff4500]">Anand Mansabdar - MERN Project</span>
          . All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default MyListings;
