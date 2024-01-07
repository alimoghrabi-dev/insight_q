import Image from "next/image";

const Logo = () => {
  return (
    <Image src="/logo.svg" alt="logo" width={27} height={27} quality={100} />
  );
};

export default Logo;
