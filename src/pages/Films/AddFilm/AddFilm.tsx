import React, { useState } from "react";
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
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { GROUPID } from "../../../utils/config";
import { useAppDispath } from "../../../store/configStore";
import { themPhimUploadHinh } from "../../../store/quanLyPhim";
import { ThemPhimUploadHinh } from "../../../types/quanLyPhimTypes";
type SizeType = Parameters<typeof Form>[0]["size"];
const AddFilm = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const [errSrcImg, setErrSrcImg] = useState("");
  const dispatch = useAppDispath();
  const formik = useFormik({
    initialValues: {
      maNhom: GROUPID,
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Tên Phim không được để trống!"),
      trailer: Yup.string().required("Trailer không được để trống!"),
      moTa: Yup.string().required("Mô tả không được để trống!"),
      ngayKhoiChieu: Yup.string().required(
        "Ngày khởi chiếu không được để trống!"
      ),
    }),
    onSubmit: (values: any) => {
      console.log("values", values);
      // tạo đối tượng formData
      let formData = new FormData();
      for (let key in values) {
        if (key === "hinhAnh") {
          formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
        }
        formData.append(key, values[key]);
      }
      // console.log(formData.get("maNhom"));
      dispatch(themPhimUploadHinh(formData));
    },
  });
  const handChangeDataPicker = (value: any) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name: string) => {
    return (value: boolean) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangInputNumber = (name: string) => {
    return (value: any) => {
      formik.setFieldValue(name, value);
    };
  };

  // React.ChangeEvent<HTMLInputElement>
  const handleChangeFile = (e: any) => {
    // lấy ra file từ e
    let file = e.target.files[0];

    // tạo đối tượng đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target?.result);
        setImgSrc(e.target?.result as string);
      };
      // console.log(file);
      // Đem file vào formik
      setErrSrcImg("");
      formik.setFieldValue("hinhAnh", file);
    } else {
      setErrSrcImg("Không hỗ trợ định dạng file này");
    }
  };

  return (
    <div>
      {" "}
      <h3 className="capitalize text-4xl">Thêm mới phim</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="Tên Phim">
          <Input
            onChange={formik.handleChange}
            name="tenPhim"
            placeholder="Nhập vào tên phim"
            value={formik.values.tenPhim}
          />
          {formik.errors.tenPhim && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.tenPhim}</p>
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            onChange={formik.handleChange}
            name="trailer"
            placeholder="Nhập vào trailer"
            value={formik.values.trailer}
          />
          {formik.errors.trailer && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.trailer}</p>
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            onChange={formik.handleChange}
            name="moTa"
            placeholder="Nhập vào mô tả"
            value={formik.values.moTa}
          />
          {formik.errors.moTa && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.moTa}</p>
          )}
        </Form.Item>
        <Form.Item label="Ngày khỏi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handChangeDataPicker} />
          {formik.errors.ngayKhoiChieu && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.ngayKhoiChieu}</p>
          )}
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>

        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleChangInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/*" />
          {errSrcImg !== "" ? (
            <p className="text-red-500 mb-0">{errSrcImg}</p>
          ) : (
            ""
          )}
          <br />
          <img src={imgSrc} alt="..." className="w-[100px] h-[100px]" />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900 mr-2 uppercase">
            Thêm phim
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddFilm;
