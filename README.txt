HƯỚNG DẪN NHANH
1. Sửa thông tin: data.json (tên, bio, link Facebook, Discord, Zalo, danh sách nhạc)
2. Đổi avatar:      thay file assets/avatar.png      (hoặc đổi đường dẫn "avatar" trong data.json)
3. Đổi background:  thay file assets/background.jpg  (hỗ trợ .mp4/.webm, đổi đường dẫn "background")
4. Nhạc:            bỏ file .mp3 vào assets/music/ rồi khai báo trong "playlist" ở data.json
5. Màu chủ đạo:     style.css, dòng --accent / --accent-2 / --accent-3 ở đầu file
6. Font:            assets/fonts/Monocraft.ttf (Monocraft, giấy phép SIL OFL). Chữ ơ, ư, đ... tự dùng font VT323 dự phòng.
7. Deploy:          giải nén, kéo cả thư mục lên Vercel (không cần build)
8. Tim / lượt xem (JSONBin, key giấu ở server):
   - Tạo bin trên jsonbin.io với nội dung {"likes": 0, "views": 0}
   - Tạo Access Key chỉ cấp quyền Read + Update
   - Vercel > Project > Settings > Environment Variables: thêm JSONBIN_BIN_ID và JSONBIN_ACCESS_KEY, rồi Redeploy
   - Chạy thử trên máy: copy .env.example thành .env.local rồi chạy "vercel dev"
