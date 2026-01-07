export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // 获取客户端 IP（Vercel 会在 header 中提供）
  const clientIp = request.headers.get('x-real-ip') || 
                   request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   'unknown';
  
  // 获取 Vercel 边缘节点的地理位置信息
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  const countryRegion = request.headers.get('x-vercel-ip-country-region') || '';
  const city = request.headers.get('x-vercel-ip-city') || '';
  const latitude = request.headers.get('x-vercel-ip-latitude') || '';
  const longitude = request.headers.get('x-vercel-ip-longitude') || '';
  
  // 获取边缘节点区域
  const edgeRegion = request.headers.get('x-vercel-id')?.split('::')[0] || 'unknown';
  
  const data = {
    code: 0,
    message: "OK",
    ttl: 1,
    data: {
      addr: clientIp,
      country: country,
      country_region: countryRegion,
      city: decodeURIComponent(city),
      latitude: parseFloat(latitude) || null,
      longitude: parseFloat(longitude) || null,
      edge_region: edgeRegion,  // Vercel 边缘节点区域 (如 sin1, hkg1)
    }
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
