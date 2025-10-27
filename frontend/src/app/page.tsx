'use client'

import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Grid,
  GridItem,
  Stack
} from "@chakra-ui/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icon } from "@/components/ui/icon";
import { 
  faHome, 
  faDashboard,
  faUser, 
  faUsers,
  faChartBar,
  faSettings,
  faCalendar,
  faShoppingCart,
  faCheck,
  faExclamationTriangle,
  faInfo,
  faReact,
  faJs,
  faNodeJs
} from "@/components/ui/icons";

export default function Home() {
  return (
    <>
      <div className="bg-page min-h-screen">
        <Container maxW="container.xl" py={8}>
          <Stack gap={8}>
            {/* Header Section */}
            <Box textAlign="center" py={10}>
              <div className="mb-4">
                <Icon icon={faHome} size="4xl" color="brand" className="mb-4" />
              </div>
              <Heading as="h1" size="2xl" mb={4} className="text-brand-primary">
                Narivoot ERP System
              </Heading>
              <Text fontSize="xl" className="text-secondary">
                <Icon icon={faReact} size="md" marginRight="2" color="info" />
                Next.js 15 + TypeScript + Tailwind CSS + Chakra UI
              </Text>
              <span className="inline-flex items-center mt-2 bg-success text-white px-4 py-1 rounded-full text-sm font-medium">
                <Icon icon={faCheck} size="sm" marginRight="1" color="inverse" />
                Ready to use!
              </span>
            </Box>

            {/* Feature Cards - Using Design Tokens */}
            <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
              <GridItem>
                <Box className="card p-6 rounded-lg border border-default hover:shadow-xl transition-all">
                  <Stack gap={4} align="start">
                    <Icon icon={faReact} size="2xl" color="brand" />
                    <Heading size="md" className="text-brand-secondary">Next.js 15</Heading>
                    <Text className="text-secondary">
                      ล่าสุดของ Next.js พร้อม App Router และ Server Components
                    </Text>
                    <span className="bg-brand-secondary text-on-brand px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      React 19
                    </span>
                  </Stack>
                </Box>
              </GridItem>

              <GridItem>
                <Box className="card p-6 rounded-lg border border-default hover:shadow-xl transition-all">
                  <Stack gap={4} align="start">
                    <Icon icon={faDashboard} size="2xl" color="brand" />
                    <Heading size="md" className="text-brand-primary">Chakra UI v3</Heading>
                    <Text className="text-secondary">
                      Component library ที่ใช้งานง่าย accessible และ customizable
                    </Text>
                    <span className="bg-brand-primary text-on-brand px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      Design System
                    </span>
                  </Stack>
                </Box>
              </GridItem>

              <GridItem>
                <Box className="card p-6 rounded-lg border border-default hover:shadow-xl transition-all">
                  <Stack gap={4} align="start">
                    <Icon icon={faSettings} size="2xl" color="info" />
                    <Heading size="md" className="text-primary">Tailwind CSS v4</Heading>
                    <Text className="text-secondary">
                      Utility-first CSS framework สำหรับการออกแบบที่รวดเร็ว
                    </Text>
                    <span className="bg-info text-on-brand px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      Utility-First
                    </span>
                  </Stack>
                </Box>
              </GridItem>

              <GridItem>
                <Box className="card p-6 rounded-lg border border-default hover:shadow-xl transition-all">
                  <Stack gap={4} align="start">
                    <Icon icon={faJs} size="2xl" color="warning" />
                    <Heading size="md" className="text-warning">TypeScript</Heading>
                    <Text className="text-secondary">
                      Type safety และ developer experience ที่ดีขึ้น
                    </Text>
                    <span className="bg-warning text-on-brand px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      Type Safe
                    </span>
                  </Stack>
                </Box>
              </GridItem>
            </Grid>

            {/* Action Buttons */}
            <Box textAlign="center" py={8}>
              <Stack direction="row" justify="center" gap={4} flexWrap="wrap">
                <button 
                  className="bg-brand-primary hover-bg-brand-primary active-bg-brand-primary text-on-brand px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center"
                >
                  <Icon icon={faDashboard} size="md" marginRight="2" color="inverse" />
                  เริ่มใช้งาน
                </button>
                <button 
                  className="bg-surface border-2 border-default text-primary hover:bg-interaction-hover px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center"
                >
                  <Icon icon={faInfo} size="md" marginRight="2" color="primary" />
                  ดูเอกสาร
                </button>
              </Stack>
            </Box>

            {/* Status Section */}
            <Box className="card p-6 rounded-lg border border-default bg-success-subtle">
              <Stack gap={3}>
                <div className="flex items-center justify-center">
                  <Icon icon={faCheck} size="lg" color="success" marginRight="2" />
                  <Heading size="md" className="text-success">พร้อมใช้งานแล้ว!</Heading>
                </div>
                <Text textAlign="center" className="text-secondary">
                  โปรเจ็กต์ได้รับการติดตั้งและกำหนดค่าเรียบร้อยแล้ว 
                  สามารถเริ่มพัฒนาแอปพลิเคชัน ERP ได้เลย
                </Text>
                <div className="flex items-center justify-center flex-wrap gap-3 text-sm font-medium">
                  <span className="flex items-center text-primary bg-surface px-3 py-1.5 rounded-full border border-default shadow-sm">
                    <Icon icon={faReact} size="xs" marginRight="1" color="success" />
                    Next.js 15
                  </span>
                  <span className="flex items-center text-primary bg-surface px-3 py-1.5 rounded-full border border-default shadow-sm">
                    <Icon icon={faJs} size="xs" marginRight="1" color="brand" />
                    TypeScript
                  </span>
                  <span className="flex items-center text-primary bg-surface px-3 py-1.5 rounded-full border border-default shadow-sm">
                    <Icon icon={faDashboard} size="xs" marginRight="1" color="brand" />
                    Chakra UI
                  </span>
                  <span className="flex items-center text-primary bg-surface px-3 py-1.5 rounded-full border border-default shadow-sm">
                    <Icon icon={faSettings} size="xs" marginRight="1" color="info" />
                    Tailwind CSS
                  </span>
                </div>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </div>
    
      {/* Theme Toggle Button */}
      <ThemeToggle />
    </>
  );
}