import Image from 'next/image';
import Link from 'next/link';

const DefaultHeader = () => {
  return (
    <header className="relative flex items-center w-full">
      <Link href="/">
        <div className="flex justify-center w-full gap-2 p-2 select-none">
          <Image src="/chicken.svg" width={40} height={40} alt="Picture of the chicken" />
          <span className="text-4xl font-lobster">Cook me pls</span>
        </div>
      </Link>
    </header>
  );
};

export default DefaultHeader;
