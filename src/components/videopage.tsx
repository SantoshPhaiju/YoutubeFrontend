import React from 'react'
import Navbar from './navbar'
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MdVerified } from 'react-icons/md';
import SemiNav from './semi-nav';
import SemiVideo from './semiVideoComponent';
import { Button } from './ui/button';

const Videopage = () => {
  return (
    <>
      <div className="w-[89%] mx-auto h-auto cursor-pointer flex ">
        <div className="">
          <Image
            src={"/assets/thumb.jpg"}
            height={200}
            width={300}
            className="h-[450px] w-[95%] mr-5 rounded-md object-cover"
            alt="VideoComponent"
          />
          <div className="video details">
            <div className="text-lg">This is my Video!!!</div>
            <div className="flex justify-between">
              <div className="channel flex gap-5 items-center">
                <div className="w-[40px] h-[40px]">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-[50%]"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="">SantoshMaster</div>
                <Button variant="destructive">Subscribe</Button>
              </div>
              <div className="flex justify-end gap-5 items-center mr-10">
                <Button variant="default">Like</Button>
                <Button variant="default">Share</Button>
                <Button variant="default">...</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <SemiNav />
          <SemiVideo />
          <SemiVideo />
          <SemiVideo />
          <SemiVideo />
        </div>
      </div>
    </>
  );
}

export default Videopage