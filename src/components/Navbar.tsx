import Image from "next/image";
import React from "react";
import NetflixLogo from "../../public/netflix-logo.png";

function Navbar() {
  return (
    <div className="fixed top-0 z-10 h-auto w-full bg-transparent px-4 py-2">
      <Image
        className="-scale-y-100"
        src={NetflixLogo}
        alt="Nitflix"
        width={50}
        height={50}
      />
    </div>
  );
}

export default Navbar;
