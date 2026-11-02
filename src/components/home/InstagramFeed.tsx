import React from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/utils";
import { ArrowUpRight, Play, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function InstagramFeed() {
  const posts = [
    {
      id: "post-1",
      title: "Gifts under ₹500 Budget! Customise your mugs & names ✨☕",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop",
      link: "https://www.instagram.com/reel/De6_KyvzgiM/",
      likes: "100+ likes",
      isVideo: true,
    },
    {
      id: "post-2",
      title: "A Date Worth Remembering! Customised 3D calendars ❤️",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=900&auto=format&fit=crop",
      link: "https://www.instagram.com/reel/DVYK1eKjcA9/",
      likes: "30+ likes",
      isVideo: true,
    },
    {
      id: "post-3",
      title: "Tshirt maade logo meedhi! Bulk & individual t-shirt printing 👕",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop",
      link: "https://www.instagram.com/p/DeycRMXk1-Q/",
      likes: "Fest Edition",
      isVideo: false,
    },
    {
      id: "post-4",
      title: "Glitter Photo Frame. Customise your photos with love #UandWe ✨",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop",
      link: "https://www.instagram.com/reel/DLUlvObz7Mv/",
      likes: "Romantic Surprises",
      isVideo: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-[#171717]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Follow Along on Social</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mt-1">
              @uandweprints on Instagram
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#E77A42] text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow Our Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Overlay with video indicator and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {post.isVideo && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-[#E77A42] font-bold uppercase tracking-wider block mb-1">
                  {post.likes}
                </span>
                <p className="text-xs font-medium text-white line-clamp-2 leading-tight">
                  {post.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
