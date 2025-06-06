import React from "react";

interface ReviewCardProps {
  img: string; // Type for the image source URL
  name: string; // Type for the name of the person
}

const ReviewCard: React.FC<ReviewCardProps> = ({ img, name }) => {
  return (
    <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div>
        <p className="text-lightText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          consectetur error, dolores quae ipsa quos enim corporis magni
          obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime
          nam molestias?
        </p>
      </div>

      <div className="flex flex-row justify-center items-center mt-4 gap-4">
        <img className="rounded-full w-1/4" src={img} alt="img" />
        <h3 className="font-semibold">{name}</h3>
      </div>
    </div>
  );
};

export default ReviewCard;
