import style from '../styles/elements/Footer.module.scss';

export default function Footer({}) {
  return (
    <footer className="">
      <div className="">
        <div className="">
          <div className="">
            <a className="" href="/terms-of-service/">
              利用規約
            </a>
            <a className="" href="/privacy-policy/">
              プライバシーポリシー
            </a>
            <a className="" href="/disclaimer/">
              免責事項
            </a>
          </div>
        </div>
        <div className="">&copy; 2021 株式会社静紅屋 Shizukuya inc.</div>
      </div>
    </footer>
  );
}
