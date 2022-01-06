import Layout from '../../components/Layout';
import style from '../../styles/elements/Section.module.scss';

// export const config = { amp: true }

export default function disclaimer() {
  return (
    <Layout title="免責事項" noindex={true} description='免責事項のページです。'>
      <div className={style.section}>
        <div className={style.section__inner}>
          <h1 className="my-4 text-4xl font-bold card-title">免責事項</h1>
          <div className={style.section__terms}>
            <ul className={style.section__termsList}>
              <li className={style.section__termsItem}>
                extracttextfromimage.online（以下、「当サイト」とします。）における免責事項は、下記の通りです。
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    コメントについて
                  </dt>
                  <dd className={style.section__termsDataData}>
                    次の各号に掲げる内容を含むコメントは、当サイト管理人の裁量によって承認せず、削除する事があります。
                  </dd>
                  <dd className={style.section__termsDataData}>
                    特定の自然人または法人を誹謗し、中傷するもの
                  </dd>
                  <dd className={style.section__termsDataData}>
                    極度にわいせつな内容を含むもの
                  </dd>
                  <dd className={style.section__termsDataData}>
                    禁制品の取引に関するものや、他者を害する行為の依頼など、法律によって禁止されている物品、行為の依頼や斡旋などに関するもの
                  </dd>
                  <dd className={style.section__termsDataData}>
                    その他、公序良俗に反し、または管理人によって承認すべきでないと認められるもの
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    当サイトの情報の正確性について
                  </dt>
                  <dd className={style.section__termsDataData}>
                    当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めていますが、誤情報が入り込んだり情報が古くなったりすることもあります。必ずしも正確性を保証するものではありません。また合法性や安全性なども保証しません。
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    損害等の責任について
                  </dt>
                  <dd className={style.section__termsDataData}>
                    当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。
                  </dd>
                  <dd className={style.section__termsDataData}>
                    また当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。
                  </dd>
                  <dd className={style.section__termsDataData}>
                    サイトを利用する場合は、自己責任で行う必要があります。
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    当サイトで掲載している画像の著作権や肖像権等について
                  </dt>
                  <dd className={style.section__termsDataData}>
                    当サイトで掲載している画像の著作権や肖像権等は、各権利所有者に帰属します。万が一問題がある場合は、お問い合わせよりご連絡いただけますよう宜しくお願い致します。
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    無断転載の禁止について
                  </dt>
                  <dd className={style.section__termsDataData}>
                    当サイトに存在する、文章や画像、動画等の著作物の情報を引用の範囲を超えて無断転載することを禁止します。
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    お問い合わせ窓口について
                  </dt>
                  <dd className={style.section__termsDataData}>
                    免責事項に関するお問い合わせは，下記の窓口までお願いいたします。
                  </dd>
                </dl>
              </li>
              <li className={style.section__termsItem}>
                <dl className={style.section__termsDataList}>
                  <dt className={style.section__termsDataTaitle}>
                    社名: 株式会社静紅屋
                  </dt>
                  <dd className={style.section__termsDataData}>
                    住所: 東京都港区北青山2-7-13 プラセオ青山ビル3階 青山アラマンダワークコート
                  </dd>
                  <dd className={style.section__termsDataData}>
                    Eメールアドレス: info.shizukuya@gmail.com
                  </dd>
                </dl>
              </li>
            </ul>
            <p className={style.section__terms__text}>2021年3月25日 策定</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
