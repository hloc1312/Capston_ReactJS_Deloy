import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { GROUPID } from "../../../utils/config";
import { RootState, useAppDispath } from "../../../store/configStore";
import {
  capNhatPhimUpload,
  getThongTinPhim,
  themPhimUploadHinh,
} from "../../../store/quanLyPhim";
import { ThemPhimUploadHinh } from "../../../types/quanLyPhimTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../components/Molecules/Loading/Loading";
type SizeType = Parameters<typeof Form>[0]["size"];
const EditFilm = () => {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const [errSrcImg, setErrSrcImg] = useState("");
  const params = useParams();
  const dispatch = useAppDispath();
  const { thongTinPhim, isFetchingUploadPhim, errUploadPhim } = useSelector(
    (state: RootState) => {
      return state.quanLyPhimReducer;
    }
  );
  // console.log({ thongTinPhim });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/admin/films");
  };
  useEffect(() => {
    dispatch(getThongTinPhim(Number(params.id)));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      maNhom: GROUPID,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: moment(thongTinPhim?.ngayKhoiChieu).format("DD/MM/YYYY"),
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: null,
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("T??n Phim kh??ng ???????c ????? tr???ng!"),
      trailer: Yup.string().required("Trailer kh??ng ???????c ????? tr???ng!"),
      moTa: Yup.string().required("M?? t??? kh??ng ???????c ????? tr???ng!"),
      ngayKhoiChieu: Yup.string().required(
        "Ng??y kh???i chi???u kh??ng ???????c ????? tr???ng!"
      ),
    }),
    onSubmit: async (values: any) => {
      console.log("values", values);
      // t???o ?????i t?????ng formData
      let formData = new FormData();
      for (let key in values) {
        if (key === "hinhAnh") {
          if (values.hinhAnh !== null) {
            formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
          }
        }
        formData.append(key, values[key]);
      }
      // console.log(formData.get("maNhom"));
      // navigate("/admin/films");
      await dispatch(capNhatPhimUpload(formData))
        .unwrap()
        .then(() => {
          showModal();
        });
    },
  });
  const handChangeDataPicker = (value: any) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    console.log(ngayKhoiChieu);
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
  const handleChangeFile = async (e: any) => {
    // l???y ra file t??? e
    let file = e.target.files[0];

    // t???o ?????i t?????ng ?????c file
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
      // ??em file v??o formik
      await formik.setFieldValue("hinhAnh", file);

      // T???o ?????i t?????ng ?????c file
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (e) => {
        // console.log(e.target?.result);
        await setImgSrc(e.target?.result as string);
      };
      // console.log(file);
      await setErrSrcImg("");
    } else {
      await setErrSrcImg("Kh??ng h??? tr??? ?????nh d???ng file n??y");
    }
  };
  if (isFetchingUploadPhim) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <h3 className="capitalize text-4xl">C???p nh???t phim</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="T??n Phim">
          <Input
            onChange={formik.handleChange}
            name="tenPhim"
            placeholder="Nh???p v??o t??n phim"
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
            placeholder="Nh???p v??o trailer"
            value={formik.values.trailer}
          />
          {formik.errors.trailer && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.trailer}</p>
          )}
        </Form.Item>
        <Form.Item label="M?? t???">
          <Input
            onChange={formik.handleChange}
            name="moTa"
            placeholder="Nh???p v??o m?? t???"
            value={formik.values.moTa}
          />
          {formik.errors.moTa && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.moTa}</p>
          )}
        </Form.Item>
        <Form.Item label="Ng??y kh???i chi???u">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handChangeDataPicker}
            // defaultValue={moment(formik.values.ngayKhoiChieu)}
            value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
          />

          {formik.errors.ngayKhoiChieu && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.ngayKhoiChieu}</p>
          )}
        </Form.Item>
        <Form.Item label="??ang chi???u" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>

        <Form.Item label="S???p chi???u" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="????nh gi??">
          <InputNumber
            onChange={handleChangInputNumber("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="H??nh ???nh">
          <input type="file" onChange={handleChangeFile} accept="image/*" />
          {errSrcImg !== "" ? (
            <p className="text-red-500 mb-0">{errSrcImg}</p>
          ) : (
            ""
          )}
          <br />
          <img
            src={imgSrc === "" ? thongTinPhim?.hinhAnh : imgSrc}
            alt="..."
            className="w-[100px] h-[100px]"
          />
        </Form.Item>

        <Form.Item label="T??c v???">
          <button className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900 mr-2 uppercase">
            C???p nh???t phim
          </button>
        </Form.Item>
        {errUploadPhim !== "" ? (
          <p className="text-red-500 font-bold">{errUploadPhim}</p>
        ) : (
          ""
        )}
      </Form>
      <Modal
        title={<span className="text-green-500">C???p nh???t th??nh c??ng</span>}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose
        closable={false}
        footer={[
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleOk}
            >
              OK
            </button>
          </div>,
        ]}
      >
        <div className="text-center">
          <CheckCircleFilled
            className="text-4xl mb-2 text-green-500"
            style={{ color: "rgb(34 197 94) " }}
          />
          <br />
          <p className="uppercase text-green-500 font-bold text-3xl">
            c???p nh???t th??nh c??ng!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default EditFilm;
