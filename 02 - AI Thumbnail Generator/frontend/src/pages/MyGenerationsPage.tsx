import { useEffect, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { dummyThumbnails, type IThumbnail } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRightIcon,
  DeleteIcon,
  DownloadIcon,
  TrashIcon,
} from "lucide-react";

const MyGenerationsPage = () => {
  const navigate = useNavigate();

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  // Function to fetch thumbnails
  const fetchThumbnails = async () => {
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  };

  const handleDownload = (image_url: string) => {
    window.open(image_url, "_blank");
  };

  const handleDelete = async (id: string) => {
    console.log(id); // This function will be implemented while doing the backend
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);
  return (
    <>
      <SoftBackdrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm mt-1 text-zinc-400">
            View and manage all your generated thumbnails
          </p>
        </div>
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px] "
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              No thumbnails yet...
            </h3>
            <p className="text-sm text-zinc-400  mt-2">
              Create atleast one thumbnail to view them here.
            </p>
          </div>
        )}

        {/* Grid to display thumbnails */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
            {thumbnails.map((thumbnail: IThumbnail) => {
              const aspectClass =
                aspectRatioClassMap[thumbnail.aspect_ratio || "16:9"];

              return (
                <div
                  key={thumbnail._id}
                  onClick={() => navigate(`/generate/${thumbnail._id}`)}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                >
                  <div
                    className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                  >
                    {thumbnail.image_url ? (
                      <img
                        src={thumbnail.image_url}
                        alt={thumbnail.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                        {thumbnail.isGenerating ? "Generating..." : "No image"}
                      </div>
                    )}

                    {thumbnail.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                        Generating...
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                      {thumbnail.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded font-semibold bg-white/8">
                        {thumbnail.style}
                      </span>
                      <span className="px-2 py-0.5 rounded font-semibold bg-white/8">
                        {thumbnail.color_scheme}
                      </span>
                      <span className="px-2 py-0.5 rounded font-semibold bg-white/8">
                        {thumbnail.aspect_ratio}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-semibold">
                      {new Date(thumbnail.createdAt!).toDateString()}
                    </p>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <TrashIcon
                      onClick={() => handleDelete(thumbnail._id)}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-red-500 transition-all"
                    />
                    <DownloadIcon
                      onClick={() => handleDownload(thumbnail.image_url!)}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-indigo-600 transition-all"
                    />

                    <Link
                      target="_blank"
                      to={`/preview?thumbnail_url=${thumbnail.image_url}&title=${thumbnail.title}`}
                    >
                      <ArrowUpRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-orange-600 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGenerationsPage;
