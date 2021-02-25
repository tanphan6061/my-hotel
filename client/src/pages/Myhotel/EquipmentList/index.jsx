import * as equipmentActions from 'actions/equipment';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import './style.scss';

function EquipmentList(props) {
  const { equipmentList, equipmentActionsCreators } = props;
  const { fetchEquipmentList, createEquipment } = equipmentActionsCreators;
  const [icon, setIcon] = useState('fas fa-wifi');
  const [name, setName] = useState('');
  const closeModal = useRef(null);

  const handleSubmitForm = () => {
    if (name === '') return toast.error('Tên tiện nghi không được trống');
    closeModal.current.click();
    createEquipment({ name, icon });
    setIcon('fas fa-wifi');
    return setName('');
  };

  const showEquipment = () => {
    const html = [];
    equipmentList.forEach((equipment, index) => {
      html.push(
        <div style={{ width: '33.33%' }} key={index}>
          <input
            id={equipment._id}
            className="form-control"
            value={equipment._id}
            type="checkbox"
            style={{ display: 'none' }}
            checked
            disabled
          />
          <label
            className="btn btn-default btn-lg equiment-icon"
            htmlFor={equipment._id}
          >
            <span className={equipment.icon} /> {equipment.name}
          </label>
        </div>,
      );
    });
    return html;
  };

  useEffect(() => {
    fetchEquipmentList();
  }, []);
  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Danh sách tiện nghi </h3>
            <p className="help-block">
              Tổng cộng: {equipmentList.length} tiện nghi
            </p>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addEquipment"
              className="btn btn-primary"
            >
              Thêm tiện nghi
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="box" style={{ minHeight: '200px' }}>
          <div className="box-content w-100" style={{ padding: '50px 50px' }}>
            <div className="d-flex flex-wrap">{showEquipment()}</div>
          </div>
        </div>
      </div>

      <div className="modal" id="addEquipment">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Thêm Tiện Nghi</h4>
              <button
                ref={closeModal}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body d-flex align-items-center justify-content-center flex-column">
              <div className="form-group">
                <label htmlFor="tienNghi">
                  <div>
                    Tên tiện nghi:
                    <input
                      type="text"
                      name="tienNghi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="tienNghi"
                      className="form-control"
                      placeholder="Nhập tên tiện nghi"
                    />
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="icon">
                  Chọn icon: &nbsp;
                  <select onChange={(e) => setIcon(e.target.value)} id="icon">
                    <option value="fas fa-wifi">&#xf1eb;</option>
                    <option value="fas fa-address-book">&#xf2b9;</option>
                    <option value="fas fa-address-card">&#xf2bb;</option>
                    <option value="fas fa-angry">&#xf556;</option>
                    <option value="fas fa-arrow-alt-circle-down">
                      &#xf358;
                    </option>
                    <option value="fas fa-arrow-alt-circle-left">
                      &#xf359;
                    </option>
                    <option value="fas fa-arrow-alt-circle-right">
                      &#xf35a;
                    </option>
                    <option value="fas fa-arrow-alt-circle-up">&#xf35b;</option>
                    <option value="fas fa-bell">&#xf0f3;</option>
                    <option value="fas fa-bell-slash">&#xf1f6;</option>
                    <option value="fas fa-bookmark">&#xf02e;</option>
                    <option value="fas fa-building">&#xf1ad;</option>
                    <option value="fas fa-calendar">&#xf133;</option>
                    <option value="fas fa-calendar-alt">&#xf073;</option>
                    <option value="fas fa-calendar-check">&#xf274;</option>
                    <option value="fas fa-calendar-minus">&#xf272;</option>
                    <option value="fas fa-calendar-plus">&#xf271;</option>
                    <option value="fas fa-calendar-times">&#xf273;</option>
                    <option value="fas fa-caret-square-down">&#xf150;</option>
                    <option value="fas fa-caret-square-left">&#xf191;</option>
                    <option value="fas fa-caret-square-right">&#xf152;</option>
                    <option value="fas fa-caret-square-up">&#xf151;</option>
                    <option value="fas fa-chart-bar">&#xf080;</option>
                    <option value="fas fa-check-circle">&#xf058;</option>
                    <option value="fas fa-check-square">&#xf14a;</option>
                    <option value="fas fa-circle">&#xf111; </option>
                    <option value="fas fa-clipboard">&#xf328; </option>
                    <option value="fas fa-clock">&#xf017;</option>
                    <option value="fas fa-clone">&#xf24d; </option>
                    <option value="fas fa-closed-captioning">&#xf20a;</option>
                    <option value="fas fa-comment">&#xf075; </option>
                    <option value="fas fa-comment-alt">&#xf27a;</option>
                    <option value="fas fa-comment-dots">&#xf4ad;</option>
                    <option value="fas fa-comments">&#xf086; </option>
                    <option value="fas fa-compass">&#xf14e; </option>
                    <option value="fas fa-copy">&#xf0c5; </option>
                    <option value="fas fa-copyright">&#xf1f9; </option>
                    <option value="fas fa-credit-card">&#xf09d;</option>
                    <option value="fas fa-dizzy">&#xf567; </option>
                    <option value="fas fa-dot-circle">&#xf192;</option>
                    <option value="fas fa-edit">&#xf044; </option>
                    <option value="fas fa-envelope-open">&#xf2b6;</option>
                    <option value="fas fa-eye">&#xf06e; </option>
                    <option value="fas fa-eye-slash">&#xf070; </option>
                    <option value="fas fa-file">&#xf15b; </option>
                    <option value="fas fa-file-alt">&#xf15c; </option>
                    <option value="fas fa-file-archive">&#xf1c6;</option>
                    <option value="fas fa-file-audio">&#xf1c7; </option>
                    <option value="fas fa-file-code">&#xf1c9; </option>
                    <option value="fas fa-file-excel">&#xf1c3; </option>
                    <option value="fas fa-file-image">&#xf1c5; </option>
                    <option value="fas fa-file-pdf">&#xf1c1; </option>
                    <option value="fas fa-file-powerpoint">&#xf1c4;</option>
                    <option value="fas fa-file-video">&#xf1c8;</option>
                    <option value="fas fa-file-word">&#xf1c2; </option>
                    <option value="fas fa-flag">&#xf024; </option>
                    <option value="fas fa-flushed">&#xf579;</option>
                    <option value="fas fa-folder">&#xf07b; </option>
                    <option value="fas fa-folder-open">&#xf07c;</option>
                    <option value="fas fa-frown">&#xf119; </option>
                    <option value="fas fa-frown-open">&#xf57a; </option>
                    <option value="fas fa-futbol">&#xf1e3;</option>
                    <option value="fas fa-gem">&#xf3a5; </option>
                    <option value="fas fa-grimace">&#xf57f;</option>
                    <option value="fas fa-grin">&#xf580; </option>
                    <option value="fas fa-grin-alt">&#xf581;</option>
                    <option value="fas fa-grin-beam">&#xf582; </option>
                    <option value="fas fa-grin-beam-sweet">&#xf583;</option>
                    <option value="fas fa-grin-hearts">&#xf584;</option>
                    <option value="fas fa-grin-squint">&#xf585;</option>
                    <option value="fas fa-grin-squint-tears">&#xf586;</option>
                    <option value="fas fa-grin-stars">&#xf587;</option>
                    <option value="fas fa-grin-tears">&#xf588;</option>
                    <option value="fas fa-grin-tongue">&#xf589;</option>
                    <option value="fas fa-grin-tongue-squint">&#xf58a;</option>
                    <option value="fas fa-grin-tongue-wink">&#xf58b;</option>
                    <option value="fas fa-grin-wink">&#xf58c; </option>
                    <option value="fas fa-hand-lizard">&#xf258;</option>
                    <option value="fas fa-hand-paper">&#xf256; </option>
                    <option value="fas fa-hand-peace">&#xf25b;</option>
                    <option value="fas fa-hand-point-down">&#xf0a7;</option>
                    <option value="fas fa-hand-point-left">&#xf0a5;</option>
                    <option value="fas fa-hand-point-right">&#xf0a4;</option>
                    <option value="fas fa-hand-point-up">&#xf0a6;</option>
                    <option value="fas fa-hand-pointer">&#xf25a;</option>
                    <option value="fas fa-hand-rock">&#xf255; </option>
                    <option value="fas fa-hand-scissors">&#xf257;</option>
                    <option value="fas fa-hand-spock">&#xf259; </option>
                    <option value="fas fa-handshake">&#xf2b5; </option>
                    <option value="fas fa-hdd">&#xf0a0;</option>
                    <option value="fas fa-heart">&#xf004; </option>
                    <option value="fas fa-hospital">&#xf0f8; </option>
                    <option value="fas fa-hourglass">&#xf254; </option>
                    <option value="fas fa-id-badge">&#xf2c1; </option>
                    <option value="fas fa-id-card">&#xf2c2; </option>
                    <option value="fas fa-image">&#xf03e; </option>
                    <option value="fas fa-images">&#xf302; </option>
                    <option value="fas fa-keyboard">&#xf11c; </option>
                    <option value="fas fa-kiss">&#xf596; </option>
                    <option value="fas fa-kiss-beam">&#xf597; </option>
                    <option value="fas fa-kiss-wink-heart">&#xf598;</option>
                    <option value="fas fa-laugh">&#xf599; </option>
                    <option value="fas fa-laugh-beam">&#xf59a; </option>
                    <option value="fas fa-laugh-squint">&#xf59b;</option>
                    <option value="fas fa-laugh-wink">&#xf59c; </option>
                    <option value="fas fa-lemon">&#xf094; </option>
                    <option value="fas fa-life-ring">&#xf1cd; </option>
                    <option value="fas fa-lightbulb">&#xf0eb; </option>
                    <option value="fas fa-list-alt">&#xf022;</option>
                    <option value="fas fa-map">&#xf279; </option>
                    <option value="fas fa-meh">&#xf11a;</option>
                    <option value="fas fa-meh-blank">&#xf5a4; </option>
                    <option value="fas fa-meh-rolling-eyes">&#xf5a5;</option>
                    <option value="fas fa-minus-square">&#xf146;</option>
                    <option value="fas fa-money-bill-alt">&#xf3d1;</option>
                    <option value="fas fa-moon">&#xf186; </option>
                    <option value="fas fa-newspaper">&#xf1ea;</option>
                    <option value="fas fa-object-group">&#xf247;</option>
                    <option value="fas fa-object-upgroup">&#xf248;</option>
                    <option value="fas fa-paper-plane">&#xf1d8;</option>
                    <option value="fas fa-pause-circle">&#xf28b;</option>
                    <option value="fas fa-play-circle">&#xf144;</option>
                    <option value="fas fa-plus-square">&#xf0fe;</option>
                    <option value="fas fa-question-circle">&#xf059;</option>
                    <option value="fas fa-registered">&#xf25d;</option>
                    <option value="fas fa-sad-cry">&#xf5b3; </option>
                    <option value="fas fa-sad-tear">&#xf5b4; </option>
                    <option value="fas fa-save">&#xf0c7; </option>
                    <option value="fas fa-share-square">&#xf14d;</option>
                    <option value="fas fa-smile">&#xf118; </option>
                    <option value="fas fa-smile-beam">&#xf5b8; </option>
                    <option value="fas fa-smile-wink">&#xf4da;</option>
                    <option value="fas fa-snowflake">&#xf2dc; </option>
                    <option value="fas fa-square">&#xf0c8; </option>
                    <option value="fas fa-star">&#xf005; </option>
                    <option value="fas fa-star-half">&#xf089; </option>
                    <option value="fas fa-sticky-note">&#xf249;</option>
                    <option value="fas fa-stop-circle">&#xf28d; </option>
                    <option value="fas fa-sun">&#xf185; </option>
                    <option value="fas fa-surprise">&#xf5c2; </option>
                    <option value="fas fa-thumbs-down">&#xf165;</option>
                    <option value="fas fa-times-circle">&#xf057;</option>
                    <option value="fas fa-tired">&#xf5c8; </option>
                    <option value="fas fa-trash-alt">&#xf2ed; </option>
                    <option value="fas fa-user">&#xf007; </option>
                    <option value="fas fa-user-circle">&#xf2bd;</option>
                    <option value="fas fa-window-close">&#xf410;</option>
                    <option value="fas fa-window-maximize">&#xf2d0;</option>
                    <option value="fas fa-window-minimize">&#xf2d1;</option>
                    <option value="fas fa-window-restore">&#xf2d2;</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-default"
              >
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitForm}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EquipmentList.propTypes = {};

const mapStateToProps = (state) => ({
  equipmentList: state.equipment.equipmentList,
});

const mapDispatchToProps = (dispatch) => ({
  equipmentActionsCreators: bindActionCreators(equipmentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList);
