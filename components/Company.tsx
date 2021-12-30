import style from '../styles/elements/Block.module.scss';

export default function Company() {
  return (
    <section className={style.block}>
      <h1 className={style.block__title}>Company</h1>
      <table className={style.block__table}>
        <tbody className={style.block__tableTbody}>
          <tr className={style.block__tableTr}>
            <th className={style.block__tableTh}>社名</th>
            <td className={style.block__tableTd}>株式会社 静紅屋</td>
          </tr>
          <tr className={style.block__tableTr}>
            <th className={style.block__tableTh}>事業内容</th>
            <td className={style.block__tableTd}>
              <ul className={style.block__tableItem}>
                <li className={style.block__tableList}>ウェブサイト、ウェブコンテンツ、その他インターネットを利用した各種サービス等の企画、制作、販売、配信、運営及び管理</li>
                <li className={style.block__tableList}>Webアプリケーション開発</li>
                <li className={style.block__tableList}>Webデザイン業務</li>
                <li className={style.block__tableList}>グラフィックデザイン業務</li>
                <li className={style.block__tableList}>ECサイトの企画、制作、運営及びコンサルティング業</li>
              </ul>
            </td>
        </tr>
        {/* <tr className={style.block__tableTr}>
          <th className={style.block__tableTh}>設立</th>
          <td className={style.block__tableTd}>2020年</td>
        </tr> */}
        <tr className={style.block__tableTr}>
          <th className={style.block__tableTh}>所在地</th>
          <td className={style.block__tableTd}>〒107-0062 東京都 港区 南青山4-17-33 グランカーサ南青山2F</td>
        </tr>
        <tr className={style.block__tableTr}>
          <th className={style.block__tableTh}>所属団体</th>
          <td className={style.block__tableTd}>東京商工会議所 会員</td>
        </tr>
        {/* <tr className={style.block__tableTr}>
          <th className={style.block__tableTh}>代表取締役</th>
          <td className={style.block__tableTd}>阪口健太郎</td>
        </tr> */}
      </tbody>
    </table>
  </section>
  );
}
