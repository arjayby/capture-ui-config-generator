import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Header, Icon, Label } from "semantic-ui-react";
import excalidraw from "@/assets/excalidraw.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Capture UI - Config Generator</title>
        <meta name="description" content="Capture UI - Config Generator - DND" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container style={{ minHeight: "100vh", paddingTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Icon name="move" size="large" style={{ marginBottom: 3 }} />
                <Header>Capture UI</Header>
              </div>
              <Label basic>config generator</Label>
            </div>
            <Link href="/new">
              <Button size="large" primary>
                Start
              </Button>
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image alt="excalidraw" src={excalidraw} style={{ marginTop: "4rem" }} priority />
          </div>
        </Container>
      </main>
    </>
  );
}
