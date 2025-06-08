export default [ 
    v => v < 100 || 'Ce champ ne peut pas dépasser 100' ,
    v => v >= 0 || 'Ce champ ne peut pas être inférieur à 0' ,
] ;