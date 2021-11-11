const alias = (prefix) => ({
    "@utils": `${prefix}/utils/`,
    "@type": `${prefix}/types/`,
    "@hooks": `${prefix}/hooks/`,
    "@pages": `${prefix}/pages/`,
    "@talons": `${prefix}/talons/`,
    "@layout": `${prefix}/layout/`,
    "@config": `${prefix}/config/`,
    "@shared": `${prefix}/shared/`,
    "@context": `${prefix}/context/`,
    "@images": `${prefix}/assets/images/`,
    "@components": `${prefix}/components/`,
});

module.exports = alias;
