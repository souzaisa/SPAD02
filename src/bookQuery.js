function buildIncludeObject(params) {
    let includeObject = {};

    Object.keys(params[0].atributes).forEach((atribute) => {
        if (params[0].atributes[atribute] === false) includeObject[atribute] = params[0].atributes[atribute];
    });

    params.forEach(param => {
        if (param.atributes) {
            includeObject[param.tableName] = { select: param.atributes };
        } else {
            includeObject[param.tableName] = true;
        }
    });

    delete includeObject[params[0].tableName];

    return includeObject;
}

// Aplicar atributo como criterio do join, verificar se tem como fazer inner, left e etc join, funções de agregação(count, max, min), groupBy, orderBy
// Gerar pdf(isa), gerar gráficos(georgio), conexão entre dois computadores(isa)
export async function booksQuery(params, prisma) {
    console.log(params)
    const response = await prisma.livro.findMany({
        where: {
            AND: params[0].filters
        },
        include: buildIncludeObject(params)
    });
    return response;
}

// export async function listQuery(params, prisma) {
//     console.log(params)
//     const response = await prisma.lista.findMany({
//         where: {
//             AND: params.filters,
//         },
//         select: params.atribute
//     });
//     return response;
// }

// export async function reviewQuery(params, prisma) {
//     console.log(params)
//     const response = await prisma.review.findMany({
//         where: {
//             AND: params.filters,
//         },
//         select: params.atribute
//     });
//     return response;
// }

// export async function booksOfListQuery(params, prisma) {
//     console.log(params)
//     const response = await prisma.livros_da_lista.findMany({
//         where: {
//             AND: params.filters,
//         },
//         select: params.atribute
//     });
//     return response;
// }