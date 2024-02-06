import React, { useState, useEffect } from 'react';
import { Flex, SegmentedControl, Box, Title, Indicator, Switch, Image } from '@mantine/core';

function Page() {

    const [value, setValue] = useState('1');
    const [switchOn, setSwitchOn] = useState(false);

    useEffect(() => {
        if (switchOn) {
            setSwitchOn(false);
        }
    }, [value]);

    return (
        <div>
            <Flex
                justify="center"
                align="center"
                wrap="wrap"
                style={{ height: '100dvh', width: '100dvw' }}
            >
                <Box w={"300"}>
                    <Image
                        radius="md"
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/school-bus-6874504-5628890.png"
                    />
                    <Title mb={20}>Driving Bus</Title>

                    {switchOn && (
                        <Indicator size={20} processing />
                    )}

                    <SegmentedControl
                        value={value}
                        fullWidth
                        onChange={setValue}
                        mb={20}
                        data={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                            { label: '5', value: '5' },
                            { label: '6', value: '6' },
                        ]}
                    />

                    <Switch
                        onClick={() => {
                            setSwitchOn(!switchOn);
                        }}
                        color='dark'
                        size="xl"
                        onLabel="Sharing"
                        offLabel="Share"
                        checked={switchOn}
                    />

                </Box>
            </Flex>

        </div>
    )
}

export default Page;
