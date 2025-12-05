export interface ILocation {
    official_id: string;
    name: string;
    category: 'provincia' | 'departamento' | 'municipio' | 'localidad';
    parent?: {
        id: string;
        name: string;
        category: string;
    };
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    provincia_id?: string;
    geometry?: {
        type: 'Polygon' | 'MultiPolygon';
        coordinates: any[];
    };
}
