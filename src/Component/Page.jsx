import React, { useState, useEffect } from 'react';
import { Flex, SegmentedControl, Box, Title, Indicator, Switch, Image } from '@mantine/core';
import axios from 'axios';

function Page() {

    const baseURL = 'https://camibackend.onrender.com';

    const [value, setValue] = useState('1');
    const [switchOn, setSwitchOn] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (switchOn) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
    
                    axios.post(`${baseURL}/update-location`, {
                        bus_number: parseInt(value), 
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    .then(response => {
                        console.log('Location updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating location:', error);
                    });
                },
                error => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            setLocation({ latitude: null, longitude: null });
        }
    }, [switchOn, value]); 
    

    return (
        <div>
            <Flex
                justify="center"
                align="center"
                wrap="wrap"
                style={{ height: '100vh', width: '100vw' }}
            >
                <Box w={300}>
                    <Image
                        radius="md"
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/school-bus-6874504-5628890.png"
                    />
                    <Title mb={20}>Driving Bus</Title>

                    {switchOn && <Indicator size={20} processing />}

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
                        onClick={() => setSwitchOn(!switchOn)}
                        color='dark'
                        size="xl"
                        onLabel="Sharing"
                        offLabel="Share"
                        checked={switchOn}
                    />

                    {/* Display latitude and longitude */}
                    {location.latitude !== null && location.longitude !== null && (
                        <Box mt={2}>
                            X : {location.latitude.toFixed(6)} Y : {location.longitude.toFixed(6)}
                        </Box>
                    )}
                </Box>
            </Flex>
        </div>
    );
}

export default Page;
