import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">404</h2>
        <p className="text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
        <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}


// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"

// export default function NotFoundPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <section className="pt-32 pb-16 flex items-center justify-center min-h-screen">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
//         >
//           <h2 className="text-3xl font-bold mb-4">404 - 페이지를 찾을 수 없습니다</h2>
//           <p className="text-gray-600 mb-6">요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가거나 다른 경로를 확인해 주세요.</p>
//           <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
//             홈으로 돌아가기
//           </Link>
//         </motion.div>
//       </section>
//     </div>
//   )
// }
