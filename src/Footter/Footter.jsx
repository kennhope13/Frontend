import "./Footer.css";
const Footter = () => {
    return (
        <>
           <div className="container-fluid footer">
           <div className="container">
           
            <div >
                <div className="col-lg-4 image-container">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.Nx5YQf4Krn9QHXi-KeQVygHaCQ&pid=Api&P=0&h=180" alt="" className="styled-image" />
                    <p> cổng thông tin khổng lồ và hoàn toàn miễn phí về các vấn đề xung quanh thú cưng và động vật</p>
                </div>
                <div className="col-lg-4 ">
                    <h2>DANH SÁCH TRANG</h2>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Liên hệ</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản dịch vụ</li>
                    </ul>
                   
                </div>
                <div className="col-lg-4">
                   <h2>THEO DÕI TÔI TẠI</h2>
                    <ul className="social-media-list">
                       <li><img src="https://www.verfvanniveau.nl/wp-content/uploads/2019/08/logo-social-fb-facebook-icon.png" alt="" /></li>
                       <li><img src="https://static.vecteezy.com/system/resources/previews/018/930/413/original/instagram-logo-instagram-icon-transparent-free-png.png" alt="" /></li>
                       <li><img src="https://static.vecteezy.com/system/resources/previews/023/986/939/original/tiktok-logo-tiktok-logo-transparent-tiktok-icon-transparent-free-free-png.png" alt="" /></li>
                       <li><img src="https://static.vecteezy.com/system/resources/previews/018/930/575/original/youtube-logo-youtube-icon-transparent-free-png.png" alt="" /></li>
                    </ul>
                </div>
                <p className="banquyen">@Bản quyền thuộc về Phạm Minh Tiên</p>
            
            </div>
           </div>
           </div>

        </>
    )
}
export default Footter