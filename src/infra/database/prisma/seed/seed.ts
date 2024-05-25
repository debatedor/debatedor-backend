// import { Slug } from '../../../../domain/projects/enterprise/entities/value-objects/slug'
// import { PrismaService } from '../prisma.service'
// import { brazilianStates } from './brazilian-states'
// import { brazilianUniversities } from './brazilian-universities'
// import { skills } from './skills'

// const prisma = new PrismaService()

// async function main() {
//   await prisma.institution.deleteMany()
//   await prisma.skill.deleteMany()
//   await prisma.state.deleteMany()

//   await prisma.skill.createMany({
//     data: skills.map((skill) => ({
//       name: skill,
//       slug: Slug.createFromText(skill).text,
//     })),
//   })

//   await prisma.state.createMany({
//     data: brazilianStates.map((state) => {
//       return {
//         name: state.name,
//         abbreviation: state.abbreviation,
//       }
//     }),
//   })

//   const universitiesAmount = 10

//   for (let i = 0; i < universitiesAmount; i++) {
//     const state = await prisma.state.findUnique({
//       where: { abbreviation: brazilianUniversities[i].state },
//     })

//     if (state !== undefined && state !== null) {
//       await prisma.institution.create({
//         data: {
//           name: brazilianUniversities[i].name,
//           abbreviation: brazilianUniversities[i].abbreviation,
//           stateId: state?.id,
//         },
//       })
//     }
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })

//   .catch(async (e) => {
//     console.error(e)

//     await prisma.$disconnect()

//     process.exit(1)
//   })
