let profile = {
    manufacturer: {
        "cryptoPath": "../PharmaNetwork/organizations/peerOrganizations/manufacturer.pharma.com", 
		"keyDirectoryPath": "../PharmaNetwork/organizations/peerOrganizations/manufacturer.pharma.com/users/User1@manufacturer.pharma.com/msp/keystore/",
        "certPath":     "../PharmaNetwork/organizations/peerOrganizations/manufacturer.pharma.com/users/User1@manufacturer.pharma.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../PharmaNetwork/organizations/peerOrganizations/manufacturer.pharma.com/peers/peer0.manufacturer.pharma.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.manufacturer.pharma.com",
        "mspId": "manufacturerMSP"
    },
    distributor: {
        "cryptoPath": "../PharmaNetwork/organizations/peerOrganizations/distributor.pharma.com", 
		"keyDirectoryPath": "../PharmaNetwork/organizations/peerOrganizations/distributor.pharma.com/users/User1@distributor.pharma.com/msp/keystore/",
        "certPath":     "../PharmaNetwork/organizations/peerOrganizations/distributor.pharma.com/users/User1@distributor.pharma.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../PharmaNetwork/organizations/peerOrganizations/distributor.pharma.com/peers/peer0.distributor.pharma.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.distributor.pharma.com",
        "mspId": "distributorMSP"
    },
    hospital: {
        "cryptoPath": "../PharmaNetwork/organizations/peerOrganizations/hospital.pharma.com", 
		"keyDirectoryPath": "../PharmaNetwork/organizations/peerOrganizations/hospital.pharma.com/users/User1@hospital.pharma.com/msp/keystore/",
        "certPath":     "../PharmaNetwork/organizations/peerOrganizations/hospital.pharma.com/users/User1@hospital.pharma.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../PharmaNetwork/organizations/peerOrganizations/hospital.pharma.com/peers/peer0.hospital.pharma.com/tls/ca.crt",
		"peerEndpoint": "localhost:6051",
		"peerHostAlias":  "peer0.hospital.pharma.com",
        "mspId": "hospitalMSP"
    },
    DVA: {
        "cryptoPath": "../PharmaNetwork/organizations/peerOrganizations/DVA.pharma.com", 
		"keyDirectoryPath": "../PharmaNetwork/organizations/peerOrganizations/DVA.pharma.com/users/User1@DVA.pharma.com/msp/keystore/",
        "certPath":     "../PharmaNetwork/organizations/peerOrganizations/DVA.pharma.com/users/User1@DVA.pharma.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../PharmaNetwork/organizations/peerOrganizations/DVA.pharma.com/peers/peer0.DVA.pharma.com/tls/ca.crt",
		"peerEndpoint": "localhost:5051",
		"peerHostAlias":  "peer0.DVA.pharma.com",
        "mspId": "DVAMSP"
    }
}
module.exports = { profile }