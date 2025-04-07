"use client";
import shortsData from "@/components/ShortsPlayer/shortsData";
import ShortsPlayer from "@/components/ShortsPlayer/ShortsPlayer"

export default function ShortsPlayerPage(){
    return <>
    <ShortsPlayer
    items={shortsData}
    actions={{
      handleLike: () => console.log("::like button clicked"),
      handleDislike: () => console.log("::dislike button clicked"),
      handleView: () => console.log("::view button clicked"),
      handleShare: () => console.log("::share button clicked"),
      handleSubscribe: () => console.log("::subscribe button clicked"),
      handleMenu: () => console.log("::Menu button clicked"),
    }}
    />;
    </>
}