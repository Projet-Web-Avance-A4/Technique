"use client";

import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";

interface iPortalCard {
  btnText: string
  href: string
  port: string
}

// Composant Card
export default function PortalCard(props: iPortalCard) {

  const handleRedirect = () => {
    window.location.href = `${props.href}:${props.port}`;
  };

    return (
        <NextUIProvider className="w-96">
            <Card className="m-4">
              <CardBody>
                <Button onClick={handleRedirect}>
                  <p>{props.btnText}</p>
                </Button>
              </CardBody>
            </Card>
        </NextUIProvider>
    );
}

