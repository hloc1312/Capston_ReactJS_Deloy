import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { HeThongRap } from "../../types/quanLyRapType";
import { quanLyRapService } from "../../services/quanLyRapService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { quanLyDatVeService } from "../../services/quanLyDatVeService";
type SizeType = Parameters<typeof Form>[0]["size"];
const ShowTime = () => {
  const params = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      maPhim: Number(params.id),
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values: any) => {
      console.log(values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        setSuccess("Tạo lịch thành công");
        setError("");
      } catch (err: any) {
        setError("Tạo lịch thất bại");
        setSuccess("");

        console.log("err", err.response.data);
      }
    },
  });
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {};
  const handleChangeHeThongRap = async (values?: any) => {
    // Lấy thông tin rạp
    try {
      const result = await quanLyRapService.getThongTinCumRap(values);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (err: any) {
      console.log("err", err.response.data);
    }
  };
  const handleChangeCumRap = (values?: any) => {
    formik.setFieldValue("maRap", values);
  };

  const onChangeDate = (values: any) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onOk = (values: any) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeNumber = (values: any) => {
    formik.setFieldValue("giaVe", values);
  };
  const [state, setState] = useState({
    heThongRap: [
      {
        biDanh: "bhd-star-cineplex",
        logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
        maHeThongRap: "BHDStar",
        tenHeThongRap: "BHD Star Cineplex",
      },
    ],
    cumRapChieu: [
      {
        maCumRap: "1",
        tenCumRap: "1",
        diaChi: "1",
        danhSachRap: [
          {
            maRap: 1,
            tenRap: "string",
          },
        ],
      },
    ],
  });
  useEffect(() => {
    (async () => {
      try {
        const result = await quanLyRapService.getListHeThongRap();
        setState({
          ...state,
          heThongRap: result.data.content as [],
        });
      } catch (err: any) {
        console.log(err.response.data);
      }
    })();
  }, []);

  let film = {
    biDanh: "everybody’s-talki-about-jamie",
    dangChieu: true,
    danhGia: 10,
    hinhAnh:
      "https://movienew.cybersoft.edu.vn/hinhanh/everybody’s-talking-about-jamie_gp13.jpg",
    hot: true,
    maNhom: "GP13",
    maPhim: 8002,
    moTa: "Inspired by true events, New Regency’s and Film4’s “Everybody’s Talking About Jamie” is the film adaptation of the hit musical. Jamie New is 16 and doesn’t quite fit in—instead of pursuing a “real” career he dreams of becoming a drag queen. Uncertain about his future, Jamie knows one thing for sure: he is going to be a sensation. Supported by his loving mom and his amazing friends, Jamie overcomes prejudice, beats the bullies and steps out of the darkness, into the spotlight.",
    ngayKhoiChieu: "2022-10-29T16:17:48.127",
    sapChieu: false,
    tenPhim: "Everybody’s Talki About Jamie",
    trailer: "https://www.youtube.com/embed/CpOeZw7xd",
  };
  if (localStorage.getItem("film")) {
    film = JSON.parse(localStorage.getItem("film") as string);
  }
  console.log({ film });

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      <h3 className="capitalize text-4xl">Tạo lịch chiếu - {film?.tenPhim}</h3>

      <Form.Item label="Hệ thống rạp">
        <Select
          options={state.heThongRap?.map((item) => ({
            label: item.tenHeThongRap,
            value: item.maHeThongRap,
          }))}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select
          options={state.cumRapChieu.map((item) => ({
            label: item.tenCumRap,
            value: item.maCumRap,
          }))}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
      </Form.Item>
      <Form.Item label="Ngày giờ chiếu">
        <DatePicker
          format={"DD/MM/YYYY hh:mm:ss"}
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>
      <Form.Item label="Ngày giờ chiếu">
        <InputNumber
          min={75000}
          max={150000}
          defaultValue={3}
          onChange={onChangeNumber}
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <Button htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
      {success !== "" ? (
        <p className="text-green-500 font-bold">{success}</p>
      ) : (
        <p className="text-red-500 font-bold">{error}</p>
      )}
    </Form>
  );
};

export default ShowTime;
