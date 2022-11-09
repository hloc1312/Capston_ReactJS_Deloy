import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Phim } from "../../../types/quanLyPhimTypes";
import "../../Molecules/CardFilm_Hover/CardFlim_Hover.css";

type ChilProps = React.HTMLAttributes<HTMLDivElement> & {
  phimTrailer?: Phim;
};
export const ModalTrailerFilm: React.FC<ChilProps> = ({ phimTrailer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setIsPause((state) => (state = true));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPause((state) => (state = false));
  };

  return (
    <>
      <div>
        <button
          className="px-2 py-1 rounded-sm !w-full block mb-2"
          onClick={showModal}
        >
          <i className="fab fa-youtube mr-1 capitalize" />
          Trailer Phim
        </button>
      </div>
      <Modal
        title={
          <span className="text-red-500">
            <i className="fab fa-youtube mr-1 capitalize" />
            Trailer Phim ({phimTrailer?.tenPhim})
          </span>
        }
        open={isModalOpen}
        onCancel={() => {
          handleCancel();
        }}
        footer={null}
        width={"1000px"}
        destroyOnClose={true}
      >
        <ReactPlayer
          url={phimTrailer?.trailer}
          playing={isModalOpen}
          controls
          width={"100%"}
          height={"500px"}
          loop
        />
      </Modal>
    </>
  );
};

export default ModalTrailerFilm;
