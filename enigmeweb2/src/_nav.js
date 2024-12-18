import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cil3d,
  cil4k,
  cilApps,
  cilBell,
  cilCalculator,
  cilCarAlt,
  cilCart,
  cilCash,
  cilChartPie,
  cilClipboard,
  cilCreditCard,
  cilCursor,
  cilDescription,
  cilDevices,
  cilDiamond,
  cilDollar,
  cilDrop,
  cilExternalLink,
  cilHome,
  cilLibrary,
  cilLocationPin,
  cilMap,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilStorage,
  cilTag,
  cilTruck,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Carrinho',
    to: '/theme/typography',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Promoções',
    to: '/theme/colors',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gerenciar',
  },
  {
    component: CNavGroup,
    name: 'Perfumes',
    to: '/produto',
    icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/produto/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/produto/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Avaliação',
    to: '/avaliacao',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/avaliacao/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/avaliacao/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Categoria',
    to: '/categoria',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/categoria/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/categoria/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Cliente',
    to: '/cliente',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/cliente/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/cliente/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Endereço',
    to: '/endereco',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/endereco/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/endereco/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Entrega',
    to: '/entrega',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/entrega/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/entrega/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pagamento',
    to: '/pagamento',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/pagamento/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/pagamento/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Item Venda',
    to: '/itemVenda',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/itemVenda/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/itemVenda/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Estoque',
    to: '/estoque',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/estoque/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/estoque/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Produto Estoque',
    to: '/produtoEstoque',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/produtoEstoque/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/produtoEstoque/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Transportadora',
    to: '/transportadora',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/transportadora/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/transportadora/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Venda',
    to: '/venda',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/venda/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/venda/list',
      },
    ],
  },
]

export default _nav
