import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta
      name="description"
      content="PokéGO - полезные инструменты для сообщества игроков в Pokemon GO"
    />
    <meta property="og:title" content="PokéGO" />
    <meta property="og:site_name" content="PokéGO" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://pokego.now.sh/images/og.jpg" />
    <meta
      property="og:description"
      content="Полезные инструменты для сообщества игроков в Pokemon GO."
    />
    <meta property="og:image:width" content="500" />
    <meta property="og:image:height" content="333" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <title>PokéGO</title>
  </Head>
);

export default Meta;
